import { EnableDisableSourceDto, UpdateMarkupPercentageDto } from '@/dtos/adminDtos/diamondSource.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ESourceType } from '@/interfaces/diamonds.interface';
import { CartModel } from '@/models/cart.model';
import { DiamondSourceModel } from '@/models/diamondSources.model';
import { DiamondModel } from '@/models/diamonds.model';
import { PriceTrackerModel } from '@/models/priceTracker.model';
import { CODE_BAD_REQUEST } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { filterDiamondSourceProjection } from '@/utils/filters/adminFilters';
import { Service } from 'typedi';

@Service()
export class DiamondSourceService {
  public async getDiamondSourceList() {
    const dimondSources = await DiamondSourceModel.find({}, filterDiamondSourceProjection);

    return dimondSources;
  }

  public async enableDisableDiamondSource(getData: EnableDisableSourceDto) {
    if (getData.sourceType === ESourceType.FILE) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.CHANGE_STATUS_FILE_SOURCE_ERROR);
    }

    const updatedDiamondSource = await DiamondSourceModel.findOneAndUpdate(
      { sourceType: getData.sourceType },
      { $set: { isDisabled: getData.isDisabled } },
      { new: true },
    );

    if (!updatedDiamondSource) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.DIAMOND_SOURCE_UPDATE_ERROR);
    }

    await DiamondModel.updateMany({ source: getData.sourceType }, { $set: { isDeleted: getData.isDisabled } });
    if (getData.isDisabled) {
      await CartModel.deleteMany({ 'diamondSnapshot.source': getData.sourceType });
      await PriceTrackerModel.deleteMany({ 'diamondSnapshot.source': getData.sourceType });
    }

    return updatedDiamondSource;
  }

  public async updateMarkupPercentage(getData: UpdateMarkupPercentageDto) {
    if (getData.sourceType === ESourceType.FILE) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.UPDATE_MARKUP_FILE_SOURCE_ERROR);
    }

    const updatedDiamondSource = await DiamondSourceModel.findOneAndUpdate(
      { sourceType: getData.sourceType },
      { $set: { markupPercentage: getData.markupPercentage } },
      { new: true },
    );

    if (!updatedDiamondSource) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.DIAMOND_SOURCE_UPDATE_ERROR);
    }

    return updatedDiamondSource;
  }
}
