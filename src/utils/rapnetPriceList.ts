import { RAPNET_API_CLIENT_ID, RAPNET_API_CLIENT_SECRET, RAPNET_API_GET_PRICE_LIST, RAPNET_API_GET_TOKEN_URL } from '@/config';
import fetch from 'node-fetch';
import { logger } from './logger';
import { RapPriceModel } from '@/models/rapPrice.model';

export const getRapNetApiAccessToken = async () => {
  try {
    const response = await fetch(RAPNET_API_GET_TOKEN_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: RAPNET_API_CLIENT_ID,
        client_secret: RAPNET_API_CLIENT_SECRET,
      }),
    });

    const data = await response.json();

    return data?.access_token;
  } catch (error) {
    logger.error(`Error while getting rap api access token >>>> ${error}`);
    return '';
  }
};

export const getRapNetPriceList = async (shape: string, token: string) => {
  if (!token || !shape) {
    logger.info('Fetch Rap List >>> token or shape missing');
    return;
  }
  try {
    const response = await fetch(`${RAPNET_API_GET_PRICE_LIST}?shape=${shape}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    logger.info(`>>> Shape : ${shape}, Total records : ${data?.length}`);
    if (!data || data?.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    logger.error(`Error while getting rap api access token >>>> ${error}`);
    return [];
  }
};

export const checkRapNetPriceListAvailable = async () => {
  const count = await RapPriceModel.countDocuments();

  return count && count > 0;
};
