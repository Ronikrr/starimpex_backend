import { UPLOAD_DIAMOND_CRON_INTERVAL } from '@/config';
import { EDiamondStatus, ESourceType, IDiamondSourceRequest } from '@/interfaces/diamonds.interface';
import { DiamondSourceModel } from '@/models/diamondSources.model';
import { anjaliRequestData, bapaSitaramRequestData, ecoStarRequestData, maitriRequestData } from '@/utils/diamondSources';
import { logger } from '@/utils/logger';
import schedule from 'node-schedule';
import fetch from 'node-fetch';
import http from 'node:http';
import https from 'node:https';
import { parseMaitriData } from '@/utils/parser/maitriParser';
import { DiamondModel } from '@/models/diamonds.model';
import { CartModel } from '@/models/cart.model';
import { PriceTrackerModel } from '@/models/priceTracker.model';
import { parseAnjaliData } from '@/utils/parser/anjaliParser';
import { parseEcoStarData } from '@/utils/parser/ecostarParser';
import { parseBapaSitaramData } from '@/utils/parser/bapaSitaramParser';
import { RapPriceModel } from '@/models/rapPrice.model';
import { checkRapNetPriceListAvailable, getRapNetApiAccessToken, getRapNetPriceList } from '@/utils/rapnetPriceList';
import { parseRapNetPriceListData } from '@/utils/parser/rapnetPriceListParser';
import { CronTime } from 'cron-time-generator';

export default class CronService {
  public async scheduleCrons() {
    schedule.scheduleJob(UPLOAD_DIAMOND_CRON_INTERVAL, async () => {
      logger.info('Running Cron Scheduler : UPLOAD DIAMOND VIA API >>>>>> ');
      try {
        await this.uploadDiamondsViaAPIs();
        logger.info('Cron Scheduler : UPLOAD DIAMOND VIA API COMPLETED >>>>>> ');
      } catch (error) {
        logger.error('Cron Scheduler : Error while running Upload diamond cron scheduler');
        logger.error(error);
      }
    });

    schedule.scheduleJob(CronTime.onSpecificDaysAt(['friday'], 9, 35), async () => {
      try {
        logger.info('Running Cron Scheduler : UPDATE RAPAPORT PRICE >>>>>> ');
        await this.updateRapPriceList();
        logger.info('Running Cron Scheduler : UPDATE RAPAPORT PRICE COMPLETED >>>>>> ');
      } catch (error) {
        logger.error(`ERROR WHILE RUNNING UPDATE RAP LIST FROM RAPNET API cron scheduler: ${error}`);
      }
    });
  }

  private async updateRapPriceList() {
    try {
      logger.info('UPDATE RAP LIST FROM RAPNET API >>>>>> ');
      const token = await getRapNetApiAccessToken();

      if (!token) {
        logger.error('Rap API Get Access Token Error : No Token Found');
        return;
      }

      const todayDate = new Date();
      const rapPriceList = [];
      const rapNetShapeList = ['round', 'pear'];
      for (let index = 0; index < rapNetShapeList.length; index++) {
        const shape = rapNetShapeList[index];
        const data = await getRapNetPriceList(shape, token);

        if (!data || data.length === 0) {
          logger.error(`RAPNET PRICE LIST NOT FOUND >>> SHAPE : ${shape}`);
        }

        rapPriceList.push(...data);
      }

      logger.info(`RAP PRICE LIST COUNT >>> ${rapPriceList.length}`);

      const parsedData = parseRapNetPriceListData(rapPriceList);

      try {
        await RapPriceModel.insertMany(parsedData);
        await RapPriceModel.deleteMany({ createdAt: { $lt: todayDate } });

        logger.info('UPDATE RAP LIST FROM RAPNET API COMPLETED>>>>>> ');
      } catch (error) {
        logger.error(`ERROR WHILE INSERTING RAP LIST >>> ${error}`);
      }
    } catch (error) {
      logger.error(`ERROR WHILE UPDATING RAP PRICE LIST >>> ${error}`);
    }
  }

  private async uploadDiamondsViaAPIs() {
    const sources = await DiamondSourceModel.find({ isDisabled: false, sourceType: { $ne: ESourceType.FILE } });

    if (!sources || sources.length === 0) {
      logger.info('NO SOURCES AVAILABLE >>>>>> ');
      return;
    }

    for (let i = 0; i < sources.length; i++) {
      switch (sources[i].sourceType) {
        case ESourceType.MAITRI:
          await this.updateMaitriDiamonds(sources[i].markupPercentage);
          break;
        case ESourceType.ANJALI:
          await this.updateAnjaliDiamonds(sources[i].markupPercentage);
          break;
        case ESourceType.ECOSTAR:
          const isRapListAvailable = await checkRapNetPriceListAvailable();
          if (!isRapListAvailable) {
            await this.updateRapPriceList();
          }
          await this.updateEcoStarDiamonds(sources[i].markupPercentage);
          break;
        case ESourceType.BAPA_SITARAM:
          await this.updateBapaSitaramDiamonds(sources[i].markupPercentage);
          break;
      }
    }
  }

  private updateMaitriDiamonds = async (markupPercentage = 0) => {
    let isEmpty = false;
    let page = 1;

    const allUniqueStoneId = [];
    do {
      logger.info('FETCH DIAMONDS FROM MAITRI >>>>>> ');
      logger.info(`Page: ${page}`);
      const data = await this.fetchMaitriDataApi({ ...maitriRequestData(page) });

      isEmpty = !data || data?.length === 0;
      if (!isEmpty) {
        logger.info(`PARSING MAITRI DATA Page: ${page} >>> `);
        const parsedData = parseMaitriData(data, ESourceType.MAITRI, markupPercentage);

        for (const diamondData of parsedData) {
          const { uniqueStoneId, ...otherData } = diamondData;
          allUniqueStoneId.push(uniqueStoneId);
          await DiamondModel.updateOne(
            { uniqueStoneId: uniqueStoneId },
            {
              $set: otherData,
            },
            { upsert: true, new: true },
          );
        }
        page += 1;
      }
    } while (!isEmpty);
    if (allUniqueStoneId.length) {
      await DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: ESourceType.MAITRI });
      await CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.MAITRI });
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.MAITRI },
        { $set: { status: EDiamondStatus.SOLD } },
      );
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.MAITRI },
        { $set: { status: EDiamondStatus.AVAILABLE } },
      );
      logger.info(`MAITRI DIAMONDS UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
    } else {
      logger.info('No Available Diamonds found');
    }
  };

  private updateAnjaliDiamonds = async (markupPercentage = 0) => {
    const allUniqueStoneId = [];

    logger.info('FETCH DIAMONDS FROM ANJALI >>>>>> ');
    const data = await this.fetchAnjaliDataApi({ ...anjaliRequestData() });

    const isEmpty = !data || data?.length === 0;
    if (isEmpty) {
      return;
    }

    logger.info(`PARSING ANJALI DATA >>> `);
    const parsedData = parseAnjaliData(data, ESourceType.ANJALI, markupPercentage);

    for (const diamondData of parsedData) {
      const { uniqueStoneId, ...otherData } = diamondData;
      allUniqueStoneId.push(uniqueStoneId);
      await DiamondModel.updateOne(
        { uniqueStoneId: uniqueStoneId },
        {
          $set: otherData,
        },
        { upsert: true, new: true },
      );
    }

    if (allUniqueStoneId.length) {
      await DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: ESourceType.ANJALI });
      await CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.ANJALI });
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.ANJALI },
        { $set: { status: EDiamondStatus.SOLD } },
      );
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.ANJALI },
        { $set: { status: EDiamondStatus.AVAILABLE } },
      );
      logger.info(`ANJALI DIAMONDS UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
    } else {
      logger.info('No Available Diamonds found');
    }
  };

  private updateEcoStarDiamonds = async (markupPercentage = 0) => {
    const allUniqueStoneId = [];

    logger.info('FETCH DIAMONDS FROM ECO STAR >>>>>> ');
    const data = await this.fetchEcoStarDataApi({ ...ecoStarRequestData() });

    const isEmpty = !data || data?.length === 0;
    if (isEmpty) {
      return;
    }

    logger.info(`PARSING ECO STAR DATA >>> `);
    const parsedData = await parseEcoStarData(data, ESourceType.ECOSTAR, markupPercentage);

    for (const diamondData of parsedData) {
      const { uniqueStoneId, ...otherData } = diamondData;
      allUniqueStoneId.push(uniqueStoneId);
      await DiamondModel.updateOne(
        { uniqueStoneId: uniqueStoneId },
        {
          $set: otherData,
        },
        { upsert: true, new: true },
      );
    }

    if (allUniqueStoneId.length) {
      await DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: ESourceType.ECOSTAR });
      await CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.ECOSTAR });
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.ECOSTAR },
        { $set: { status: EDiamondStatus.SOLD } },
      );
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.ECOSTAR },
        { $set: { status: EDiamondStatus.AVAILABLE } },
      );
      logger.info(`ECOSTAR DIAMONDS UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
    } else {
      logger.info('No Available Diamonds found');
    }
  };

  private updateBapaSitaramDiamonds = async (markupPercentage = 0) => {
    const allUniqueStoneId = [];

    logger.info('FETCH DIAMONDS FROM BAPA SITARAM >>>>>> ');
    const data = await this.fetchBapaSitaramDiamondsDataApi({ ...bapaSitaramRequestData() });

    const isEmpty = !data || data?.length === 0;
    if (isEmpty) {
      return;
    }

    logger.info(`PARSING BAPA SITARAM DATA >>> `);
    const parsedData = parseBapaSitaramData(data, ESourceType.BAPA_SITARAM, markupPercentage);

    for (const diamondData of parsedData) {
      const { uniqueStoneId, ...otherData } = diamondData;
      allUniqueStoneId.push(uniqueStoneId);
      await DiamondModel.updateOne(
        { uniqueStoneId: uniqueStoneId },
        {
          $set: otherData,
        },
        { upsert: true, new: true },
      );
    }

    if (allUniqueStoneId.length) {
      await DiamondModel.deleteMany({ uniqueStoneId: { $nin: allUniqueStoneId }, source: ESourceType.BAPA_SITARAM });
      await CartModel.deleteMany({ 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.BAPA_SITARAM });
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $nin: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.BAPA_SITARAM },
        { $set: { status: EDiamondStatus.SOLD } },
      );
      await PriceTrackerModel.updateMany(
        { 'diamondSnapshot.uniqueStoneId': { $in: allUniqueStoneId }, 'diamondSnapshot.source': ESourceType.BAPA_SITARAM },
        { $set: { status: EDiamondStatus.AVAILABLE } },
      );
      logger.info(`BAPA SITARAM UPLOADED >>>>> UPLOAD COUNT [AVAILABLE] : ${allUniqueStoneId.length}`);
    } else {
      logger.info('No Available Diamonds found');
    }
  };

  private fetchMaitriDataApi = async (requestData: IDiamondSourceRequest): Promise<Array<any>> => {
    try {
      const headers: any = {
        'Content-Type': 'application/json',
      };
      if (requestData?.token) {
        headers.Authorization = requestData.token;
      }

      const httpAgent = new http.Agent({
        keepAlive: true,
      });
      const httpsAgent = new https.Agent({
        keepAlive: true,
      });

      const response = await fetch(requestData.apiURL, {
        method: requestData.method,
        body: JSON.stringify(requestData.data),
        headers,
        agent: function (_parsedURL) {
          if (_parsedURL.protocol == 'http:') {
            return httpAgent;
          } else {
            return httpsAgent;
          }
        },
      });

      const data = await response.json();

      if (data && data?.StatusCode === 200) {
        logger.info(`Total records: ${JSON.parse(data.Data)?.TotalRecords}`);
        return JSON.parse(data.Data)?.ViPacketListForAPIResult || [];
      }

      logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
    } catch (error) {
      logger.error('>>> Error while fetching data');
      logger.error(error);
    }

    return null;
  };

  private fetchAnjaliDataApi = async (requestData: IDiamondSourceRequest): Promise<Array<any>> => {
    try {
      const searchParams = new URLSearchParams({
        APIToken: requestData.token,
      }).toString();

      const response = await fetch(`${requestData.apiURL}?` + searchParams, {
        method: requestData.method,
      });

      const data = await response.json();

      if (data && data?.ApiStatus === 'Success') {
        logger.info(`Total records: ${data.StoneList.length}`);
        return data?.StoneList || [];
      }

      logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
    } catch (error) {
      logger.error('>>> Error while fetching data');
      logger.error(error);
    }

    return null;
  };

  private fetchEcoStarDataApi = async (requestData: IDiamondSourceRequest): Promise<Array<any>> => {
    try {
      const searchParams = new URLSearchParams();
      requestData.params.forEach(param => {
        searchParams.set(param.key, param.value);
      });

      const response = await fetch(`${requestData.apiURL}?` + searchParams, {
        method: requestData.method,
      });

      const data = await response.json();

      if (data && data?.success === 1) {
        logger.info(`Total records: ${data.data?.length}`);
        return data?.data || [];
      }

      logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
    } catch (error) {
      logger.error('>>> Error while fetching data');
      logger.error(error);
    }

    return null;
  };

  private fetchBapaSitaramDiamondsDataApi = async (requestData: IDiamondSourceRequest): Promise<Array<any>> => {
    try {
      const searchParams = new URLSearchParams();
      requestData.params.forEach(param => {
        searchParams.set(param.key, param.value);
      });

      const response = await fetch(`${requestData.apiURL}?` + searchParams.toString(), {
        method: requestData.method,
      });

      const data = await response.json();

      if (data) {
        logger.info(`Total records: ${data?.length || 0}`);
        return data || [];
      }

      logger.info(`>>> Error while fetching data: ${JSON.stringify(data)}`);
    } catch (error) {
      logger.error('>>> Error while fetching data');
      logger.error(error);
    }

    return null;
  };
}
