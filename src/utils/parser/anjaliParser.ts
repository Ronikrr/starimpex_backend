import { ELabGrownType, EDiamondType, EDiamondStatus } from '@/interfaces/diamonds.interface';
import { calculateOurDiscount, calculateOurPrice, calculatePricePerCarat, calculateRatioByShape } from '../helpers';
import { ANJALI_STONE_NUMBER_PREFIX } from '@/config';
import { DIAMOND_MEASUREMENT_REGEX } from '../regex';

const florescenceTerminology = {
  none: 'none',
  slt: 'slight',
  vsl: 'very slight',
};

const getFlorescenceValue = (value: string) => {
  return florescenceTerminology[value] ? florescenceTerminology[value] : value || null;
};

export const parseAnjaliData = (data: Array<any>, sourceType: string, markupPercentage: number) => {
  if (!data || data.length === 0) {
    return;
  }

  const IGI_CVD_CERTIFICATE_COMMENT =
    'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
  const IGI_HPHT_CERTIFICATE_COMMENT =
    'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';

  const parsedData = [];

  for (const obj of data) {
    const stoneNo = obj?.Stone_NO ? obj.Stone_NO : null;
    const isAvailable = String(obj?.StockStatus || '').toLowerCase() === 'available';
    if (stoneNo && isAvailable) {
      const isNotFancyColor = !obj?.FColor;
      const netAmount = obj?.SaleAmt || 0;
      const liveRap = obj?.LiveRAP || 0;
      const weight = obj?.Weight || 0;

      const rapRate = isNotFancyColor ? liveRap : weight !== 0 ? netAmount / weight : 0;
      const ourPrice = calculateOurPrice(netAmount, markupPercentage);
      const ourDiscount = isNotFancyColor ? calculateOurDiscount(ourPrice, rapRate, weight) : 0;
      const pricePerCarat = calculatePricePerCarat(ourPrice, weight);

      const shade = obj?.Tinge ? String(obj.Tinge).toLowerCase() : null;
      const eyeClean = obj?.Eyeclean ? (obj?.Eyeclean === 'Y' ? 100 : 81) : null;
      const motibaGemsComment = eyeClean ? `${eyeClean}% eye clean with ${shade === 'white' || !shade ? 'no' : shade} tinge.` : null;

      let certificateComment = '';

      const labType = obj?.Lab ? String(obj.Lab).toLowerCase().trim() : null;
      let type = null;
      if (obj?.CVD_HPHT) {
        type = String(obj.CVD_HPHT).toLowerCase();
      }
      if (obj?.Natural_Type) {
        type = String(obj.Natural_Type).toLowerCase();
      }

      if (labType === 'igi' && type === ELabGrownType.CVD) {
        certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
      }
      if (labType === 'igi' && type === ELabGrownType.HPHT) {
        certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
      }

      const city = obj?.Location ? String(obj.Location).toLowerCase() : null;
      const country = city === 'surat' || city === 'mumbai' ? 'india' : null;
      const inclusion = [obj?.Table_Inclusion, obj?.Black_Inclusion, obj?.Side_Inclusion, obj?.Open_Inclusion, obj?.Feather_Inclusion].filter(
        value => !(typeof value === 'undefined' || value === undefined || value === '' || value === null),
      );
      const milky = obj?.Milkey ? String(obj?.Milkey || '').toLowerCase() : null;
      const noBGM = (!milky || milky === 'none') && (!shade || shade === 'white') ? true : false;

      const measurement: string = obj?.Measurement || '';
      const measures = measurement.match(DIAMOND_MEASUREMENT_REGEX);
      const isMeasuresArrayNotEmpty = Array.isArray(measures) && measures?.length > 1;
      const length = isMeasuresArrayNotEmpty ? Number(measures?.[1] || 0) : null;
      const width = isMeasuresArrayNotEmpty ? Number(measures?.[2] || 0) : null;
      const height = isMeasuresArrayNotEmpty ? Number(measures?.[3] || 0) : null;

      const shape = obj?.Shape ? String(obj.Shape).toLowerCase() : null;
      const ratio = obj?.Ratio || obj?.Ratio === 0 ? Number(obj.Ratio) : calculateRatioByShape(shape, width, length);

      const certificateLink =
        labType === 'igi' && obj?.Lab_Report_No ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj.Lab_Report_No}` : obj?.LabLink || null;

      parsedData.push({
        stoneNo: `${ANJALI_STONE_NUMBER_PREFIX}${stoneNo}`,
        source: sourceType,
        uniqueStoneId: `${sourceType}_${stoneNo}`,
        lab: labType,
        inscription: labType === 'none' || !labType ? 'no' : 'yes',
        shape: shape,
        caratWeight: obj?.Weight || obj?.Weight === 0 ? Number(obj.Weight) : null,
        pricePerCarat: pricePerCarat,
        color: obj?.Color ? String(obj.Color).toLowerCase() : null,
        fancyColor: obj?.FColor ? String(obj.FColor).toLowerCase() : null,
        fancyIntensity: obj?.FCIntens ? String(obj.FCIntens).toLowerCase() : null,
        fancyOvertone: obj?.FCOverton ? String(obj.FCOverton).toLowerCase() : null,
        noBGM: noBGM,
        clarity: obj?.Clarity ? String(obj.Clarity).toLowerCase() : null,
        cut: obj?.Cut ? String(obj.Cut).toLowerCase() : null,
        polish: obj?.Polish ? String(obj.Polish).toLowerCase() : null,
        symmetry: obj?.Symm ? String(obj.Symm).toLowerCase() : null,
        florescence: obj?.FlrIntens ? getFlorescenceValue(String(obj.FlrIntens).toLowerCase().trim()) : null,
        type: type,
        country: country,
        city: city,
        shade: shade,
        luster: obj?.Luster ? String(obj.Luster).toLowerCase() : null,
        eyeClean: eyeClean,
        milky: milky,
        inclusion: inclusion.join(','),
        extraFacet: obj?.ExtraFacet ? String(obj.ExtraFacet).toLowerCase() : null,
        internalGraining: obj?.Internal_Graining ? String(obj.Internal_Graining).toLowerCase() : null,
        surfaceGraining: obj?.Surface_Graining ? String(obj?.Surface_Graining).toLowerCase() : null,
        heartsAndArrows: obj?.HnA ? String(obj.HnA).toLowerCase() === 'yes' : null,
        measurement: obj?.Measurement || null,
        length: length,
        width: width,
        height: height,
        depthPercentage: obj?.Total_Depth_Per || obj?.Total_Depth_Per === 0 ? Number(obj.Total_Depth_Per) : null,
        tablePercentage: obj?.Table_Diameter_Per || obj?.Table_Diameter_Per === 0 ? Number(obj.Table_Diameter_Per) : null,
        crownAngle: obj?.CrownAngle || obj?.CrownAngle === 0 ? Number(obj.CrownAngle) : null,
        crownHeight: obj?.CrownHeight || obj?.CrownHeight === 0 ? Number(obj.CrownHeight) : null,
        pavilionAngle: obj?.PavillionAngle || obj?.PavillionAngle === 0 ? Number(obj.PavillionAngle) : null,
        pavilionHeight: obj?.PavillionHeight || obj?.PavillionHeight === 0 ? Number(obj.PavillionHeight) : null,
        starLength: obj?.StarLength || null,
        lowerHalves: obj?.LowerHalve || null,
        girdleType:
          obj?.GirdleThin_ID && obj?.GirdleThick_ID ? `${obj.GirdleThin_ID}, ${obj.GirdleThick_ID}` : obj?.GirdleThin_ID || obj?.GirdleThick_ID,
        girdlePercentage: obj?.Girdle_Per || obj?.Girdle_Per === 0 ? Number(obj.Girdle_Per) : null,
        culetSize: obj?.CuletSize ? String(obj?.CuletSize).toLowerCase() : null,
        ratio: ratio,
        videoLink: obj?.Video_url || null,
        imageLink: obj?.Stone_Img_url || null,
        certificateLink: certificateLink,
        rap: rapRate,
        ourPrice: ourPrice,
        ourDiscount: ourDiscount,
        metadata: {
          fluoColor: obj?.FlrColor,
          fancyColor: obj?.FColor,
          fancyColorIntensity: obj?.FCIntens,
          fancyColorOverTone: obj?.FCOverton,
          status: obj?.StockStatus,
          girdleName: obj?.GirdleName,
          girdleCondition: obj?.GirdleCon,
          stoneNo: stoneNo,
          florescenceIntensity: obj?.FlrIntens,
          minimumDiameter: obj?.Diameter_Min,
          maximumDiameter: obj?.Diameter_Max,
          totalDepth: obj?.Total_Depth,
          labLocation: obj?.LabLocation,
          labReportNo: obj?.Lab_Report_No,
          labLink: obj?.LabLink,
          labReportDate: obj?.Lab_Report_Date,
          laserInscription: obj?.Laser_Inscription,
          treatment: obj?.Treatment,
          culetCondition: obj?.CuletCon,
          pairStockNo: obj?.PairStock_No,
          parcelsStone: obj?.Parcels_Stone,
          comment: obj?.Comment,
          tableInclusion: obj?.Table_Inclusion,
          blackInclusion: obj?.Black_Inclusion,
          sideInclusion: obj?.Side_Inclusion,
          openInclusion: obj?.Open_Inclusion,
          brand: obj?.Brand,
          tinge: obj?.Tinge,
          featherInclusion: obj?.Feather_Inclusion,
          fancyColorDescription: obj?.Fancy_Color_Description,
          stoneComment: obj?.NewArrival,
          isVideoExists: obj?.Is_VedioExist,
          isImageExists: obj?.Is_imgExist,
          isCertificateExists: obj?.Is_CertyExist,
          labReportComment: obj?.Lab_Report_Comment,
          remarks: obj?.Remarks,
          controlNo: obj?.Control_No,
          actualRap: obj?.LiveRAP,
          actualDiscount: obj?.SaleDis,
          actualPricePerCarat: obj?.Weight ? calculatePricePerCarat(obj.SaleAmt, obj.Weight) : 0,
          actualPrice: obj?.SaleAmt,
          salesRate: obj?.SaleRate,
          BIS: obj?.BIS,
          BIC: obj?.BIC,
          WIS: obj?.WIS,
          WIC: obj?.WIC,
          ratio: obj?.Ratio,
        },
        isDeleted: false,
        notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
        keyToSymbol: obj?.KeyToSymbols ? String(obj.KeyToSymbols).toLowerCase() : null,
        certificateComment: certificateComment,
        diamondType: String(obj.Diamond_Type || '').toLowerCase() === 'labgrown' ? EDiamondType.LAB_GROWN_DIAMONDS : null,
        status: EDiamondStatus.AVAILABLE,
        motibaGemsComment: motibaGemsComment,
      });
    }
  }

  return parsedData;
};
