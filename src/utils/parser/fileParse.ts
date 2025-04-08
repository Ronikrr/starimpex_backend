import { FILE_STONE_NUMBER_PREFIX } from '@/config';
import { EDiamondStatus, EDiamondType, ESourceType } from '@/interfaces/diamonds.interface';
import { diamondTypeValues } from '../uploadViaFile';
import { DIAMOND_MEASUREMENT_REGEX } from '../regex';
import { calculateRatioByShape } from '../helpers';

export const parseFileData = (data: Array<any>) => {
  if (!data) {
    return;
  }

  const parsedData = [];
  const soldUniqueStoneIds = [];
  for (const obj of data) {
    const isAvailable = obj[56] && obj[56].toLowerCase() === EDiamondStatus.AVAILABLE;
    const stoneNo = obj?.[0] ? obj[0].toString().trim() : null;

    if (stoneNo && !isAvailable) {
      soldUniqueStoneIds.push(`${ESourceType.FILE}_${stoneNo}`);
    }

    if (stoneNo && isAvailable) {
      const shape = obj?.[2] ? obj[2].toLowerCase() : null;
      let width = obj?.[24] ? Number(obj[24]) : null;
      let length = obj?.[36] ? Number(obj[36]) : null;
      let height = obj?.[25] ? Number(obj[25]) : null;
      const measurement = obj?.[23] ? obj[23] : null;

      if ((!width || !height || !length) && measurement) {
        const measures = measurement.match(DIAMOND_MEASUREMENT_REGEX);
        const isMeasuresArrayNotEmpty = Array.isArray(measures) && measures?.length > 1;

        if (!length && length !== 0) {
          length = isMeasuresArrayNotEmpty ? Number(measures?.[1] || 0) : null;
        }

        if (!width && width !== 0) {
          width = isMeasuresArrayNotEmpty ? Number(measures?.[2] || 0) : null;
        }

        if (!height && height !== 0) {
          height = isMeasuresArrayNotEmpty ? Number(measures?.[3] || 0) : null;
        }
      }
      const ratio = obj?.[48] ? Number(obj[48]) : calculateRatioByShape(shape, width, length);

      parsedData.push({
        stoneNo: `${FILE_STONE_NUMBER_PREFIX}${stoneNo}`,
        source: ESourceType.FILE,
        uniqueStoneId: `${ESourceType.FILE}_${stoneNo}`,
        lab: obj?.[1] ? obj[1].toLowerCase() : null,
        shape: shape,
        caratWeight: obj?.[3] || obj?.[3] === 0 ? Number(obj[3]) : null,
        color: obj?.[4] ? obj[4].toLowerCase() : null,
        clarity: obj?.[5] ? obj[5].toLowerCase() : null,
        cut: obj?.[6] ? obj[6].toLowerCase() : null,
        polish: obj?.[7] ? obj[7].toLowerCase() : null,
        symmetry: obj?.[8] ? obj[8].toLowerCase() : null,
        diamondType: obj?.[9]
          ? obj[9].toLowerCase() === diamondTypeValues[0]
            ? EDiamondType.LAB_GROWN_DIAMONDS
            : obj[9].toLowerCase() === diamondTypeValues[1]
            ? EDiamondType.NATURAL_DIAMONDS
            : null
          : null,
        type: obj?.[10] ? obj[10].toLowerCase() : null,
        shade: obj?.[11] ? obj[11].toLowerCase() : null,
        rap: obj?.[12] || obj?.[12] === 0 ? Number(obj[12]) : null,
        pricePerCarat: obj?.[13] || obj?.[13] === 0 ? Number(obj[13]) : null,
        ourDiscount: obj?.[14] || obj?.[14] === 0 ? Number(obj[14]) : null,
        ourPrice: obj?.[15] || obj?.[15] === 0 ? Number(obj[15]) : null,
        inscription: obj?.[16] ? obj[16].toLowerCase() : null,
        noBGM: typeof obj?.[17] !== 'undefined' ? obj[17].toLowerCase() === 'yes' : null,
        country: obj?.[18] ? obj[18].toLowerCase() : null,
        city: obj?.[19] ? obj[19].toLowerCase() : null,
        luster: obj?.[20] ? obj[20].toLowerCase() : null,
        milky: obj?.[21] ? obj[21].toLowerCase() : null,
        eyeClean: obj?.[22] || obj?.[22] === 0 ? Number(obj[22]) : null,
        measurement: measurement,
        width: width,
        height: height,
        florescence: obj?.[26] ? obj[26].toLowerCase() : null,
        inclusion: obj?.[27] ? obj[27].toLowerCase() : null,
        extraFacet: obj?.[28] ? obj[28] : null,
        internalGraining: obj?.[29] ? obj[29] : null,
        surfaceGraining: obj?.[30] ? obj[30] : null,
        heartsAndArrows: typeof obj?.[31] !== 'undefined' ? obj[31] === 'yes' : null,
        culetSize: obj?.[32] ? obj[32].toLowerCase() : null,
        fancyColor: obj?.[33] ? obj[33].toLowerCase() : null,
        fancyIntensity: obj?.[34] ? obj[34].toLowerCase() : null,
        fancyOvertone: obj?.[35] ? obj[35].toLowerCase() : null,
        length: length,
        depthPercentage: obj?.[37] || obj?.[37] === 0 ? Number(obj[37]) : null,
        tablePercentage: obj?.[38] || obj?.[38] === 0 ? Number(obj[38]) : null,
        crownAngle: obj?.[39] || obj?.[39] === 0 ? Number(obj[39]) : null,
        crownHeight: obj?.[40] || obj?.[40] === 0 ? Number(obj[40]) : null,
        pavilionAngle: obj?.[41] || obj?.[41] === 0 ? Number(obj[41]) : null,
        pavilionHeight: obj?.[42] || obj?.[42] === 0 ? Number(obj[42]) : null,
        starLength: obj?.[43] ? obj[43] : null,
        lowerHalves: obj?.[44] ? obj[44] : null,
        girdleType: obj?.[45] ? obj[45].toLowerCase() : null,
        girdlePercentage: obj?.[46] || obj?.[46] === 0 ? Number(obj[46]) : null,
        metadata: {
          girdleCondition: obj?.[47] ? obj[47].toLowerCase() : null,
          ratio: obj?.[48],
          actualRap: obj?.[12] || obj?.[12] === 0 ? Number(obj[12]) : null,
          actualDiscount: obj?.[14] || obj?.[14] === 0 ? Number(obj[14]) : null,
          actualPricePerCarat: obj?.[13] || obj?.[13] === 0 ? Number(obj[13]) : null,
          actualPrice: obj?.[15] || obj?.[15] === 0 ? Number(obj[15]) : null,
        },
        ratio: ratio,
        videoLink: obj?.[49] ? obj[49] : null,
        imageLink: obj?.[50] ? obj[50] : null,
        certificateLink: obj?.[51] ? obj[51] : null,
        keyToSymbol: obj?.[52] ? obj[52].toLowerCase() : null,
        notes: obj?.[53] ? obj[53] : null,
        motibaGemsComment: obj?.[54] ? obj[54] : null,
        certificateComment: obj?.[55] ? obj[55] : null,
        status: EDiamondStatus.AVAILABLE,
        isDeleted: false,
      });
    }
  }

  return { parsedData, soldUniqueStoneIds };
};
