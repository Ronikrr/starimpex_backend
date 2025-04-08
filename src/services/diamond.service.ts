import { PAGE_LIMIT } from '@/config';
import { GetDiamondListDto, SendExcelMailDto } from '@/dtos/userDtos/diamond.dto';
import { HttpException } from '@/exceptions/HttpException';
import { EDiamondEyeClean } from '@/interfaces/diamonds.interface';
import { Diamond, DiamondModel } from '@/models/diamonds.model';
import { UserDiamondNotesModel } from '@/models/userDiamondNotes.model';
import { User } from '@/models/users.model';
import { CODE_BAD_REQUEST, CODE_NOT_FOUND } from '@/response/response.codes';
import { ResponseMessages } from '@/response/response.messages';
import { mainShapes, SHAPE_OTHERS_OPTION } from '@/utils/diamond';
import { getDiamondExcelBuffer } from '@/utils/fileExport';
import { filterDiamond } from '@/utils/filters/userFilters';
import { formatDate, formatDiamondToExcelData, getEyeCleanCondition } from '@/utils/helpers';
import { sendDiamondDataExcelMail } from '@/utils/mailer';
import { Service } from 'typedi';

@Service()
export class DiamondService {
  public async getDiamondList(getData: GetDiamondListDto, user?: User): Promise<{ totalPages: number; totalCount: number; diamonds: Diamond[] }> {
    const eyeCleanEnumValues = Object.values(EDiamondEyeClean);
    const isEyeCleanListValid = getData.eyeCleanList ? getData.eyeCleanList.every(value => eyeCleanEnumValues.includes(value)) : true;
    if (!isEyeCleanListValid) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.DIAMOND_EYE_CLEAN_FILTER_ERROR);
    }

    const isFancyColor = typeof getData.isFancyColor === 'boolean' && getData.isFancyColor;
    const findCondition: any = { isDeleted: false };
    if (getData.diamondType) {
      findCondition.diamondType = getData.diamondType;
    }
    if (getData?.shapeList && getData.shapeList.length > 0) {
      const shapeFilters = getData.shapeList.map(shape => String(shape).toLowerCase().trim());
      const includeOtherShapes = shapeFilters.includes(SHAPE_OTHERS_OPTION);

      if (includeOtherShapes) {
        const excludeShapes = [];
        for (const key in mainShapes) {
          if (!shapeFilters.includes(key)) {
            excludeShapes.push(...mainShapes[key]);
          }
        }
        findCondition.shape = { $nin: excludeShapes };
      } else {
        const includeShapes = [];
        for (const key in mainShapes) {
          if (shapeFilters.includes(key)) {
            includeShapes.push(...mainShapes[key]);
          }
        }
        findCondition.shape = { $in: includeShapes };
      }
    }
    if (getData?.labList && getData.labList.length > 0) {
      findCondition.lab = { $in: getData.labList.map(lab => lab.toLowerCase()) };
    }
    if (getData?.caratWeightList && getData.caratWeightList.length > 0) {
      const caratCondition = [];
      getData.caratWeightList.forEach(carat => {
        const caratWeightRangeCondition: any = {};
        if (carat.from) {
          caratWeightRangeCondition.$gte = carat.from;
        }
        if (carat.to) {
          caratWeightRangeCondition.$lte = carat.to;
        }
        caratCondition.push({ caratWeight: caratWeightRangeCondition });
      });
      findCondition.$or = caratCondition;
    }
    if (!isFancyColor && getData?.colorList && getData.colorList.length > 0) {
      findCondition.color = { $in: getData.colorList.map(color => color.toLowerCase()) };
    }
    if (!isFancyColor && (!getData?.colorList || getData.colorList.length === 0)) {
      findCondition.color = { $ne: null };
    }
    if (getData?.noBGM !== null) {
      findCondition.noBGM = getData.noBGM;
    }
    if (isFancyColor && getData?.fancyColorList && getData.fancyColorList.length > 0) {
      findCondition.fancyColor = { $in: getData.fancyColorList.map(fancyColor => fancyColor.toLowerCase()) };
    }
    if (isFancyColor && (!getData?.fancyColorList || getData.fancyColorList.length === 0)) {
      findCondition.fancyColor = { $ne: null };
    }
    if (isFancyColor && getData?.fancyIntensityList && getData.fancyIntensityList.length > 0) {
      findCondition.fancyIntensity = { $in: getData.fancyIntensityList.map(fancyIntensity => fancyIntensity.toLowerCase()) };
    }
    if (isFancyColor && getData?.fancyOvertoneList && getData.fancyOvertoneList.length > 0) {
      findCondition.fancyOvertone = { $in: getData.fancyOvertoneList.map(fancyOvertone => fancyOvertone.toLowerCase()) };
    }
    if (getData?.clarityList && getData.clarityList.length > 0) {
      findCondition.clarity = { $in: getData.clarityList.map(clarity => clarity.toLowerCase()) };
    }
    if (getData?.cutList && getData.cutList.length > 0) {
      findCondition.cut = { $in: getData.cutList.map(cut => cut.toLowerCase()) };
    }
    if (getData?.polishList && getData.polishList.length > 0) {
      findCondition.polish = { $in: getData.polishList.map(polish => polish.toLowerCase()) };
    }
    if (getData?.symmetryList && getData.symmetryList.length > 0) {
      findCondition.symmetry = { $in: getData.symmetryList.map(symmetry => symmetry.toLowerCase()) };
    }
    if (getData?.florescenceList && getData.florescenceList.length > 0) {
      findCondition.florescence = { $in: getData.florescenceList.map(florescence => florescence.toLowerCase()) };
    }
    if (getData?.countryList && getData.countryList.length > 0) {
      findCondition.country = { $in: getData.countryList.map(country => country.toLowerCase()) };
    }
    if (getData?.eyeCleanList && getData.eyeCleanList.length > 0) {
      const eyeCleanCondition = [];
      getData.eyeCleanList.forEach(eyeClean => {
        eyeCleanCondition.push({ eyeClean: getEyeCleanCondition(eyeClean) });
      });
      if (findCondition.$or) {
        findCondition.$and = [{ $or: findCondition.$or }, { $or: eyeCleanCondition }];
        delete findCondition.$or;
      } else {
        findCondition.$or = eyeCleanCondition;
      }
    }
    if (getData?.typeList && getData.typeList.length > 0) {
      findCondition.type = { $in: getData.typeList.map(type => type.toLowerCase()) };
    }
    if (getData?.discountRange?.to) {
      findCondition.ourDiscount = { $gte: -getData.discountRange.to };
    }
    if (getData?.discountRange?.from) {
      if (findCondition?.ourDiscount) {
        findCondition.ourDiscount.$lte = -getData.discountRange.from;
      } else {
        findCondition.ourDiscount = { $lte: -getData.discountRange.from };
      }
    }
    if (getData?.pricePerCaratRange?.from) {
      findCondition.pricePerCarat = { $gte: getData.pricePerCaratRange.from };
    }
    if (getData?.pricePerCaratRange?.to) {
      if (findCondition?.pricePerCarat) {
        findCondition.pricePerCarat.$lte = getData.pricePerCaratRange.to;
      } else {
        findCondition.pricePerCarat = { $lte: getData.pricePerCaratRange.to };
      }
    }
    if (getData?.totalPriceRange?.from) {
      findCondition.ourPrice = { $gte: getData.totalPriceRange.from };
    }
    if (getData?.totalPriceRange?.to) {
      if (findCondition?.ourPrice) {
        findCondition.ourPrice.$lte = getData.totalPriceRange.to;
      } else {
        findCondition.ourPrice = { $lte: getData.totalPriceRange.to };
      }
    }
    if (getData?.tablePercentageRange?.from) {
      findCondition.tablePercentage = { $gte: getData.tablePercentageRange.from };
    }
    if (getData?.tablePercentageRange?.to) {
      if (findCondition?.tablePercentage) {
        findCondition.tablePercentage.$lte = getData.tablePercentageRange.to;
      } else {
        findCondition.tablePercentage = { $lte: getData.tablePercentageRange.to };
      }
    }
    if (getData?.depthPercentageRange?.from) {
      findCondition.depthPercentage = { $gte: getData.depthPercentageRange.from };
    }
    if (getData?.depthPercentageRange?.to) {
      if (findCondition?.depthPercentage) {
        findCondition.depthPercentage.$lte = getData.depthPercentageRange.to;
      } else {
        findCondition.depthPercentage = { $lte: getData.depthPercentageRange.to };
      }
    }
    if (getData?.lengthRange?.from) {
      findCondition.length = { $gte: getData.lengthRange.from };
    }
    if (getData?.lengthRange?.to) {
      if (findCondition?.length) {
        findCondition.length.$lte = getData.lengthRange.to;
      } else {
        findCondition.length = { $lte: getData.lengthRange.to };
      }
    }
    if (getData?.widthRange?.from) {
      findCondition.width = { $gte: getData.widthRange.from };
    }
    if (getData?.widthRange?.to) {
      if (findCondition?.width) {
        findCondition.width.$lte = getData.widthRange.to;
      } else {
        findCondition.width = { $lte: getData.widthRange.to };
      }
    }
    if (getData?.ratioRange?.from) {
      findCondition.ratio = { $gte: getData.ratioRange.from };
    }
    if (getData?.ratioRange?.to) {
      if (findCondition?.ratio) {
        findCondition.ratio.$lte = getData.ratioRange.to;
      } else {
        findCondition.ratio = { $lte: getData.ratioRange.to };
      }
    }
    if (getData?.crownHeightRange?.from) {
      findCondition.crownHeight = { $gte: getData.crownHeightRange.from };
    }
    if (getData?.crownHeightRange?.to) {
      if (findCondition?.crownHeight) {
        findCondition.crownHeight.$lte = getData.crownHeightRange.to;
      } else {
        findCondition.crownHeight = { $lte: getData.crownHeightRange.to };
      }
    }
    if (getData?.crownAngleRange?.from) {
      findCondition.crownAngle = { $gte: getData.crownAngleRange.from };
    }
    if (getData?.crownAngleRange?.to) {
      if (findCondition?.crownAngle) {
        findCondition.crownAngle.$lte = getData.crownAngleRange.to;
      } else {
        findCondition.crownAngle = { $lte: getData.crownAngleRange.to };
      }
    }
    if (getData?.pavilionHeightRange?.from) {
      findCondition.pavilionHeight = { $gte: getData.pavilionHeightRange.from };
    }
    if (getData?.pavilionHeightRange?.to) {
      if (findCondition?.pavilionHeight) {
        findCondition.pavilionHeight.$lte = getData.pavilionHeightRange.to;
      } else {
        findCondition.pavilionHeight = { $lte: getData.pavilionHeightRange.to };
      }
    }
    if (getData?.pavilionAngleRange?.from) {
      findCondition.pavilionAngle = { $gte: getData.pavilionAngleRange.from };
    }
    if (getData?.pavilionAngleRange?.to) {
      if (findCondition?.pavilionAngle) {
        findCondition.pavilionAngle.$lte = getData.pavilionAngleRange.to;
      } else {
        findCondition.pavilionAngle = { $lte: getData.pavilionAngleRange.to };
      }
    }
    if (getData?.girdlePercentageRange?.from) {
      findCondition.girdlePercentage = { $gte: getData.girdlePercentageRange.from };
    }
    if (getData?.girdlePercentageRange?.to) {
      if (findCondition?.girdlePercentage) {
        findCondition.girdlePercentage.$lte = getData.girdlePercentageRange.to;
      } else {
        findCondition.girdlePercentage = { $lte: getData.girdlePercentageRange.to };
      }
    }
    if (getData?.culetSizeList && getData.culetSizeList.length > 0) {
      findCondition.culetSize = { $in: getData.culetSizeList.map(culetSize => culetSize.toLowerCase()) };
    }
    if (getData?.keyToSymbolIncludeList && getData.keyToSymbolIncludeList.length > 0) {
      findCondition.keyToSymbol = { $in: getData.keyToSymbolIncludeList.map(keyToSymbol => keyToSymbol.toLowerCase()) };
    }
    if (getData?.keyToSymbolExcludeList && getData.keyToSymbolExcludeList.length > 0) {
      findCondition.keyToSymbol = { $nin: getData.keyToSymbolExcludeList.map(keyToSymbol => keyToSymbol.toLowerCase()) };
    }
    if (getData.stoneIds) {
      findCondition.stoneNo = { $in: getData.stoneIds.split(',') };
    }

    const totalCount = await DiamondModel.countDocuments(findCondition);

    if (!totalCount) {
      return {
        diamonds: [],
        totalPages: 0,
        totalCount: 0,
      };
    }

    const limit = getData?.limit || PAGE_LIMIT;
    const skip = getData?.skip || 0;
    let sortObject: any = { pricePerCarat: 1, updatedAt: -1 };
    if (getData.sortOrder) {
      sortObject = { ...sortObject, ...getData.sortOrder };
    }
    let findDiamonds: any = await DiamondModel.find(findCondition).sort(sortObject).skip(skip).limit(limit);

    if (user) {
      const findDiamondIds = findDiamonds.map(diamond => diamond.uniqueStoneId);
      const notesList = await UserDiamondNotesModel.find({ user: user._id, uniqueStoneId: { $in: findDiamondIds } });
      findDiamonds = findDiamonds.map(diamond => {
        const findNote = notesList.find(data => data.uniqueStoneId === diamond.uniqueStoneId)?.notes || '';
        return { ...filterDiamond(diamond.toObject()), userNotes: findNote };
      });
    }

    return {
      diamonds: findDiamonds,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };
  }

  public async getDiamond(diamondId: string): Promise<Diamond> {
    const findDiamond = await DiamondModel.findOne({ isDeleted: false, _id: diamondId });

    if (!findDiamond) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.DIAMOND_NOT_FOUND);
    }

    return findDiamond;
  }

  public async exportDiamondsToExcel(diamondIds: string[]) {
    const findDiamonds = await DiamondModel.find({ _id: { $in: diamondIds }, isDeleted: false });
    if (!findDiamonds || findDiamonds.length === 0) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.SOLD_OUT_ERROR_REFRESH_PAGE);
    }

    const finalDiamondData = formatDiamondToExcelData(findDiamonds);

    const buffer = await getDiamondExcelBuffer(finalDiamondData, `Stone Details ${formatDate(new Date())}`);

    return buffer;
  }

  public async sendDiamondExcelMail(data: SendExcelMailDto) {
    const findDiamonds = await DiamondModel.find({ _id: { $in: data.diamondIds }, isDeleted: false });
    if (!findDiamonds || findDiamonds.length === 0) {
      throw new HttpException(CODE_BAD_REQUEST, ResponseMessages.SOLD_OUT_ERROR_REFRESH_PAGE);
    }

    const finalDiamondData = formatDiamondToExcelData(findDiamonds);
    const buffer = await getDiamondExcelBuffer(finalDiamondData, `Stone Details ${formatDate(new Date())}`);
    sendDiamondDataExcelMail({ email: data.email, excelBuffer: buffer });
  }

  public async getCertificate(diamondId: string): Promise<{ certificateLink: string }> {
    const findDiamond = await DiamondModel.findOne({ isDeleted: false, _id: diamondId });

    if (!findDiamond) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.DIAMOND_NOT_FOUND);
    }

    return { certificateLink: findDiamond.certificateLink };
  }

  public async getVideo(diamondId: string): Promise<{ videoLink: string }> {
    const findDiamond = await DiamondModel.findOne({ isDeleted: false, _id: diamondId });

    if (!findDiamond) {
      throw new HttpException(CODE_NOT_FOUND, ResponseMessages.DIAMOND_NOT_FOUND);
    }

    return { videoLink: findDiamond.videoLink };
  }
}
