import { ELabGrownType, EDiamondType, EDiamondStatus } from '@/interfaces/diamonds.interface';
import { calculateOurDiscount, calculateOurPrice, calculatePricePerCarat, calculateRatioByShape } from '../helpers';
import { DIAMOND_MEASUREMENT_REGEX } from '../regex';
import { BAPA_SITARAM_STONE_NUMBER_PREFIX } from '@/config';

const shapeTerminology = {
  cu: 'cushion',
  em: 'emerald',
  ht: 'heart',
  mq: 'marquise',
  ov: 'oval',
  pe: 'pear',
  pr: 'princess',
  rad: 'radiant',
  rd: 'round',
  sqcus: 'square cushion',
  sqem: 'square emerald',
  sqrad: 'square radiant',
  eu: 'euro cut',
};

const cutTerminology = {
  ideal: 'id',
};

const florescenceTerminology = {
  none: 'none',
  sl: 'slight',
  vsl: 'very slight',
  stg: 'strong',
};

const getShapeValue = (shape: string) => {
  return shapeTerminology[shape] ? shapeTerminology[shape] : shape;
};

const getCutValue = (cut: string) => {
  return cutTerminology[cut] ? cutTerminology[cut] : cut;
};

const getFlorescenceValue = (value: string) => {
  return florescenceTerminology[value] ? florescenceTerminology[value] : value || null;
};

export const parseBapaSitaramData = (data: Array<any>, sourceType: string, markupPercentage: number) => {
  if (!data || data.length === 0) {
    return;
  }

  const IGI_CVD_CERTIFICATE_COMMENT =
    'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
  const IGI_HPHT_CERTIFICATE_COMMENT =
    'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';

  const parsedData = [];

  for (const obj of data) {
    const stoneNo = obj?.stock_num ? obj.stock_num : null;
    const isAvailable = String(obj?.availability || '').toLowerCase() === 'available';
    if (stoneNo && isAvailable) {
      const rapRate = obj?.Rap_price ? Number(obj.Rap_price) : 0;
      const weight = obj?.size ? Number(obj.size) : 0;
      const netAmount = obj?.total_sales_price ? Number(obj.total_sales_price) : 0;
      const ourPrice = calculateOurPrice(netAmount, markupPercentage);
      const ourDiscount = calculateOurDiscount(ourPrice, rapRate, weight);
      const pricePerCarat = calculatePricePerCarat(ourPrice, weight);

      const shade = obj?.shade ? String(obj.shade).toLowerCase() : null;
      const eyeClean = obj?.eye_clean ? (String(obj?.eye_clean).toLowerCase() === 'yes' ? 100 : 81) : null;
      const motibaGemsComment = eyeClean ? `${eyeClean}% eye clean with ${shade === 'white' || !shade ? 'no' : shade} tinge.` : null;

      let certificateComment = '';

      const labType = obj?.lab ? String(obj.lab).toLowerCase().trim() : null;
      const type = obj?.DiamondType ? String(obj.DiamondType).toLowerCase().trim() : null;

      if (labType === 'igi' && type === ELabGrownType.CVD) {
        certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
      }
      if (labType === 'igi' && type === ELabGrownType.HPHT) {
        certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
      }

      let diamondType = null;
      const labGrownTypes = Object.values(ELabGrownType) as String[];
      if (labGrownTypes.includes(type)) {
        diamondType = EDiamondType.LAB_GROWN_DIAMONDS;
      }
      if (type === 'natural') {
        diamondType = EDiamondType.NATURAL_DIAMONDS;
      }

      const city = obj?.city ? String(obj.city).toLowerCase() : null;
      const country = obj?.country ? String(obj.country).toLowerCase() : null;
      const state = obj?.state ? String(obj.state).toLowerCase() : null;
      const inclusion = [obj?.inclusion_black, obj?.inclusion_open, obj?.inclusion_center].filter(
        value => !(typeof value === 'undefined' || value === undefined || value === '' || value === null),
      );
      const milky = obj?.milky ? String(obj?.milky || '').toLowerCase() : null;
      const noBGM = (!milky || milky === 'none') && (!shade || shade === 'white') ? true : false;

      const measurement: string = obj?.measurement || '';
      const measures = measurement.match(DIAMOND_MEASUREMENT_REGEX);
      const isMeasuresArrayNotEmpty = Array.isArray(measures) && measures?.length > 1;
      const length = isMeasuresArrayNotEmpty ? Number(measures?.[1] || 0) : null;
      const width = isMeasuresArrayNotEmpty ? Number(measures?.[2] || 0) : null;
      const height = isMeasuresArrayNotEmpty ? Number(measures?.[3] || 0) : null;

      const shape = obj?.shape ? getShapeValue(String(obj.shape).toLowerCase().trim()) : null;
      const ratio = obj?.ratio ? Number(obj.ratio) : calculateRatioByShape(shape, width, length);

      const certificateLink =
        labType === 'igi' && obj?.cert_num ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj.cert_num}` : obj?.cert_url || null;

      parsedData.push({
        stoneNo: `${BAPA_SITARAM_STONE_NUMBER_PREFIX}${stoneNo}`,
        source: sourceType,
        uniqueStoneId: `${sourceType}_${stoneNo}`,
        lab: labType,
        inscription: labType === 'none' || !labType ? 'no' : 'yes',
        shape: shape,
        caratWeight: weight,
        pricePerCarat: pricePerCarat,
        color: obj?.color ? String(obj.color).toLowerCase() : null,
        fancyColor: obj?.fancy_color ? String(obj.fancy_color).toLowerCase() : null,
        fancyIntensity: obj?.fancy_color_intensity ? String(obj.fancy_color_intensity).toLowerCase().trim() : null,
        fancyOvertone: obj?.fancy_color_overtone ? String(obj.fancy_color_overtone).toLowerCase() : null,
        noBGM: noBGM,
        clarity: obj?.clarity ? String(obj.clarity).toLowerCase() : null,
        cut: obj?.cut ? getCutValue(String(obj.cut).toLowerCase().trim()) : null,
        polish: obj?.polish ? String(obj.polish).toLowerCase() : null,
        symmetry: obj?.symmetry ? String(obj.symmetry).toLowerCase() : null,
        florescence: obj?.fluor_intensity ? getFlorescenceValue(String(obj.fluor_intensity).toLowerCase().trim()) : null,
        type: type,
        country: country,
        city: city,
        state: state,
        shade: shade,
        luster: null,
        eyeClean: eyeClean,
        milky: milky,
        inclusion: inclusion ? inclusion.join(',') : null,
        extraFacet: null,
        internalGraining: null,
        surfaceGraining: null,
        heartsAndArrows: null,
        measurement: measurement,
        length: length,
        width: width,
        height: height,
        depthPercentage: obj?.depth_percent || obj?.depth_percent === 0 ? Number(obj.depth_percent) : null,
        tablePercentage: obj?.table_percent || obj?.table_percent === 0 ? Number(obj.table_percent) : null,
        crownAngle: obj?.crown_angle || obj?.crown_angle === 0 ? Number(obj.crown_angle) : null,
        crownHeight: obj?.crown_height || obj?.crown_height === 0 ? Number(obj.crown_height) : null,
        pavilionAngle: obj?.pavilion_angle || obj?.pavilion_angle === 0 ? Number(obj.pavilion_angle) : null,
        pavilionHeight: obj?.pavilion_depth || obj?.pavilion_depth === 0 ? Number(obj.pavilion_depth) : null,
        starLength: obj?.star_length || null,
        lowerHalves: null,
        girdleType: obj?.girdle_min && obj?.girdle_max ? `${obj.girdle_min}, ${obj.girdle_max}` : obj?.girdle_min || obj?.girdle_max,
        girdlePercentage: obj?.girdle_percent || obj?.girdle_percent === 0 ? Number(obj.girdle_percent) : null,
        culetSize: obj?.culet_size ? String(obj?.culet_size).toLowerCase() : null,
        ratio: ratio,
        videoLink: obj?.video_url || null,
        imageLink: obj?.image_url || null,
        certificateLink: certificateLink,
        rap: rapRate,
        ourPrice: ourPrice,
        ourDiscount: ourDiscount,
        metadata: {
          girdleCondition: obj?.girdle_condition,
          stoneNo: obj?.stock_num,
          availability: obj?.availability,
          certificateNumber: obj?.cert_num,
          actualRap: obj?.Rap_price || obj?.Rap_price === 0 ? Number(obj?.Rap_price) : null,
          actualDiscount: obj?.discount_percent || obj?.discount_percent === 0 ? Number(obj?.discount_percent) : null,
          actualPricePerCarat: obj?.price_per_cara ? Number(obj?.price_per_cara) : null,
          actualPrice: obj?.total_sales_price || obj?.total_sales_price === 0 ? Number(obj?.total_sales_price) : null,
          comments: obj?.comments,
          certificateComment: obj?.cert_comment,
          culetCondition: obj?.culet_condition,
          inclusionCenter: obj?.inclusion_center,
          setMatchedPairSeparable: obj?.set_matched_pair_separable,
          treatment: obj?.treatment,
          tradeShow: obj?.trade_show,
          laserInscription: obj?.laser_inscription,
          cameraRef: obj?.camera_ref,
          cashDiscount: obj?.cash_discount,
          cashPrice: obj?.cash_price,
          pairStockNumber: obj?.pair_stock_num,
          parcelStones: obj?.parcel_stones,
          inclusionBlack: obj?.inclusion_black,
          inclusionOpen: obj?.inclusion_open,
          cameraType: obj?.camera_type,
          fancyOrderSecondaryColor: obj?.fancy_color_secondary_color,
          printOrderNo: obj?.PrintOrderNo,
          diamondDate: obj?.DiamondDate,
        },
        isDeleted: false,
        notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
        keyToSymbol: obj?.KeyToSymbole ? String(obj.KeyToSymbole).toLowerCase().split('  ') : null,
        certificateComment: certificateComment,
        diamondType: diamondType,
        status: EDiamondStatus.AVAILABLE,
        motibaGemsComment: motibaGemsComment,
      });
    }
  }

  return parsedData;
};
