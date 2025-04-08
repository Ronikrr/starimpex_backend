import { EDiamondStatus, EDiamondType, ELabGrownType } from '@/interfaces/diamonds.interface';
import { calculateOurDiscount, calculateOurPrice, calculatePricePerCarat, calculateRatioByShape, roundFloatValues } from '../helpers';
import { ECOSTAR_STONE_NUMBER_PREFIX } from '@/config';
import { DIAMOND_MEASUREMENT_REGEX } from '../regex';
import { RapPriceModel } from '@/models/rapPrice.model';
import { mainShapes } from '../diamond';

const subTypeTerminology = {
  cvd: 'cvd',
  'cvd-as grown': 'cvd',
  hpht: 'hpht',
};

const florescenceTerminology = {
  none: 'none',
  sl: 'slight',
};

const getSubType = (type: string) => {
  return subTypeTerminology[type] ? subTypeTerminology[type] : type;
};

const getFlorescenceValue = (value: string) => {
  return florescenceTerminology[value] ? florescenceTerminology[value] : value || null;
};

export const parseEcoStarData = async (data: Array<any>, sourceType: string, markupPercentage: number) => {
  if (!data || data.length === 0) {
    return;
  }

  const rapPriceList = await RapPriceModel.find().sort({ rapDate: -1, lowSize: -1, highSize: -1 });

  const IGI_CVD_CERTIFICATE_COMMENT =
    'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
  const IGI_HPHT_CERTIFICATE_COMMENT =
    'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';

  const parsedData = [];

  for (const obj of data) {
    const stoneNo = obj['Stock #'] ? obj['Stock #'] : null;
    if (stoneNo && String(obj?.Availability || '').toLowerCase() === 'ga') {
      const netAmount = obj['Total $'] || 0;
      const weight = obj?.Weight || 0;
      const shape = obj?.Shape ? String(obj.Shape).toLowerCase().trim() : null;
      const color = obj?.Color && obj?.Color !== '*' ? String(obj.Color).toLowerCase().trim() : null;
      const clarity = obj?.Clarity ? String(obj.Clarity).toLowerCase() : null;

      const isRoundShape = mainShapes.round.includes(shape);
      const matchColor = color === 'o-p' ? 'm' : color;
      const rapPriceMatch = color
        ? rapPriceList.find(
            priceData =>
              priceData.shape === (isRoundShape ? 'round' : 'pear') &&
              priceData.clarity === clarity &&
              priceData.color === matchColor &&
              priceData.lowSize <= weight,
          )
        : null;
      const rapRate = rapPriceMatch ? roundFloatValues(Number(rapPriceMatch?.price), 2) : null;
      const ourPrice = calculateOurPrice(netAmount, markupPercentage);
      const ourDiscount = rapRate || rapRate === 0 ? calculateOurDiscount(ourPrice, rapRate, weight) : null;
      const pricePerCarat = calculatePricePerCarat(ourPrice, weight);

      const shade = obj?.Shade ? String(obj.Shade).toLowerCase() : null;

      let certificateComment = '';

      const labType = obj?.Lab ? String(obj.Lab).toLowerCase().trim() : null;
      const type = obj['Stone Type'] ? getSubType(String(obj['Stone Type']).toLowerCase().trim()) : null;

      if (labType === 'igi' && type === ELabGrownType.CVD) {
        certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
      }
      if (labType === 'igi' && type === ELabGrownType.HPHT) {
        certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
      }

      const measurement: string = obj?.Measurements || '';
      const measures = measurement.match(DIAMOND_MEASUREMENT_REGEX);
      const isMeasuresArrayNotEmpty = Array.isArray(measures) && measures?.length > 1;
      const length = isMeasuresArrayNotEmpty ? Number(measures?.[1] || 0) : null;
      const width = isMeasuresArrayNotEmpty ? Number(measures?.[2] || 0) : null;
      const height = isMeasuresArrayNotEmpty ? Number(measures?.[3] || 0) : null;

      const ratio = calculateRatioByShape(shape, width, length);

      const certificateLink =
        labType === 'igi' && obj['Certificate #']
          ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj['Certificate #']}`
          : obj['Certificate Link'] || null;

      parsedData.push({
        stoneNo: `${ECOSTAR_STONE_NUMBER_PREFIX}${stoneNo}`,
        source: sourceType,
        uniqueStoneId: `${sourceType}_${stoneNo}`,
        lab: labType === 'non-cert' ? 'none' : labType,
        inscription: labType === 'none' || !labType || labType === 'non-cert' ? 'no' : 'yes',
        shape: shape,
        caratWeight: weight,
        pricePerCarat: pricePerCarat,
        color: color,
        fancyColor: obj['Fancy Color'] ? String(obj['Fancy Color']).toLowerCase() : null,
        fancyIntensity: obj['Fancy Color Intensity'] ? String(obj['Fancy Color Intensity']).toLowerCase() : null,
        fancyOvertone: obj['Fancy Color Overtone'] ? String(obj['Fancy Color Overtone']).toLowerCase() : null,
        noBGM: String(obj?.BGM || '').toLowerCase() === 'no' ? true : false,
        clarity: clarity,
        cut: obj?.CutGrade ? String(obj.CutGrade).toLowerCase() : null,
        polish: obj?.Polish ? String(obj.Polish).toLowerCase() : null,
        symmetry: obj?.Symmetry ? String(obj.Symmetry).toLowerCase() : null,
        florescence: obj['Fluorescence Intensity'] ? getFlorescenceValue(String(obj['Fluorescence Intensity']).toLowerCase().trim()) : null,
        type: type,
        country: obj?.Country ? String(obj.Country).toLowerCase() : null,
        state: obj?.State ? String(obj.State).toLowerCase() : null,
        city: obj?.City ? String(obj.City).toLowerCase() : null,
        shade: shade === 'wh' ? 'white' : shade,
        luster: null,
        eyeClean: null,
        milky: obj?.Milky ? String(obj.Milky).toLowerCase() : null,
        inclusion: null,
        extraFacet: null,
        internalGraining: null,
        surfaceGraining: null,
        heartsAndArrows: obj?.HNA ? String(obj.HNA).toLowerCase() !== 'no' : null,
        measurement: measurement,
        length: length,
        width: width,
        height: height,
        depthPercentage: obj['Depth %'] || obj['Depth %'] === 0 ? Number(obj['Depth %']) : 0,
        tablePercentage: obj['Table %'] || obj['Table %'] === 0 ? Number(obj['Table %']) : 0,
        crownAngle: obj['Crown Angle'] || obj['Crown Angle'] === 0 ? Number(obj['Crown Angle']) : 0,
        crownHeight: obj['Crowhn Height'] || obj['Crowhn Height'] === 0 ? Number(obj['Crowhn Height']) : 0,
        pavilionAngle: obj['Pavilion Angle'] || obj['Pavilion Angle'] === 0 ? Number(obj['Pavilion Angle']) : 0,
        pavilionHeight: obj['Pavilion Depth'] || obj['Pavilion Depth'] === 0 ? Number(obj['Pavilion Depth']) : 0,
        starLength: null,
        lowerHalves: null,
        girdleType: obj?.GirdleThin && obj?.GirdleThick ? `${obj.GirdleThin}, ${obj.GirdleThick}` : obj?.GirdleThin || obj?.GirdleThick,
        girdlePercentage: obj['Girdle %'] || obj['Girdle %'] === 0 ? Number(obj['Girdle %']) : 0,
        culetSize: obj['Culet Size'] ? String(obj['Culet Size']).toLowerCase() : null,
        ratio: ratio,
        videoLink: obj['Diamond Video'] || null,
        imageLink: obj['Diamond Image'] || null,
        certificateLink: certificateLink,
        rap: rapRate,
        ourPrice: ourPrice,
        ourDiscount: ourDiscount,
        metadata: {
          stoneNo: obj['Stock #'],
          availability: obj?.Availability,
          certificateNumber: obj['Certificate #'] || null,
          girdleCondition: null,
          treatment: obj?.TREATMENT,
          actualRap: null,
          actualDiscount: null,
          actualPricePerCarat: obj['$/Ct'],
          actualPrice: obj['Total $'],
          memberComments: obj['Member Comments'],
          diamondDetailsLink: obj['Diamond Details Link'],
          laserInscription: obj['Laser Inscription'],
        },
        isDeleted: false,
        notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
        keyToSymbol: obj['Key To Symbols'] && obj['Key To Symbols'] !== '-' ? String(obj['Key To Symbols']).toLowerCase().split('  ') : null,
        certificateComment: certificateComment,
        diamondType: type && (Object.values(ELabGrownType) as Array<string>).includes(type) ? EDiamondType.LAB_GROWN_DIAMONDS : null,
        status: EDiamondStatus.AVAILABLE,
        motibaGemsComment: null,
      });
    }
  }

  return parsedData;
};
