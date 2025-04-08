import { ELabGrownType, EDiamondType, EDiamondStatus } from '@/interfaces/diamonds.interface';
import { calculateOurDiscount, calculateOurPrice, calculatePricePerCarat, calculateRatioByShape } from '../helpers';
import { MAITRI_STONE_NUMBER_PREFIX } from '@/config';
import { DIAMOND_MEASUREMENT_REGEX } from '../regex';

export const parseMaitriData = (data: Array<any>, sourceType: string, markupPercentage: number) => {
  if (!data) {
    return;
  }

  const IGI_CVD_CERTIFICATE_COMMENT =
    'This Laboratory Grown Diamond was created by Chemical Vapor Deposition (CVD) growth process.Indications of post-growth treatment Type IIa';
  const IGI_HPHT_CERTIFICATE_COMMENT =
    'As Grown - No indication of post-growth treatment This Laboratory Grown Diamond was created by High Pressure High Temperature (HPHT) growth process Type II';

  const parsedData = [];

  for (const obj of data) {
    const stoneNo = obj?.Code ? obj.Code : null;
    if (stoneNo) {
      const rapRate = obj?.RapRate || 0;
      const weight = obj?.Weight || 0;
      const netAmount = obj?.NetAmount || 0;
      const ourPrice = calculateOurPrice(netAmount, markupPercentage);
      const ourDiscount = calculateOurDiscount(ourPrice, rapRate, weight);
      const pricePerCarat = calculatePricePerCarat(ourPrice, weight);
      const motibaGemsComment =
        obj?.Shade && obj?.EC
          ? `${obj?.EC} eye clean with ${(obj?.Shade || '').toLowerCase() === 'white' || !obj?.Shade ? 'no' : obj?.Shade} tinge.`
          : null;

      let certificateComment = '';
      if (obj?.Lab === 'IGI' && obj?.Type === ELabGrownType.CVD) {
        certificateComment = IGI_CVD_CERTIFICATE_COMMENT;
      }
      if (obj?.Lab === 'IGI' && obj?.Type === ELabGrownType.HPHT) {
        certificateComment = IGI_HPHT_CERTIFICATE_COMMENT;
      }

      const shape = obj?.Shape ? obj.Shape.toLowerCase() : null;
      let width = obj?.Width || obj?.Width === 0 ? Number(obj.Width) : null;
      let length = obj?.Length || obj?.Length === 0 ? Number(obj.Length) : null;
      let height = obj?.Height || obj?.Height === 0 ? Number(obj.Height) : null;
      const measurement = obj?.Measurements || '';

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
      const ratio = obj?.LengthByWidthRatio ? obj.LengthByWidthRatio : calculateRatioByShape(shape, width, length);

      const labType = String(obj?.Lab || '').toLowerCase();
      const certificateLink =
        labType === 'igi' && obj?.CertificateNumber
          ? `https://www.igi.org/API-IGI/viewpdf-url.php?r=${obj.CertificateNumber}`
          : obj?.CertificateLink || null;

      parsedData.push({
        stoneNo: stoneNo ? `${MAITRI_STONE_NUMBER_PREFIX}${stoneNo}` : null,
        source: sourceType,
        uniqueStoneId: stoneNo ? `${sourceType}_${stoneNo}` : null,
        lab: labType || null,
        inscription: !labType || labType === 'none' ? 'no' : 'yes',
        shape: shape,
        caratWeight: obj?.Weight,
        pricePerCarat: pricePerCarat,
        color: obj?.Color ? obj.Color.toLowerCase() : null,
        fancyColor: obj?.FancyColor ? obj.FancyColor.toLowerCase() : null,
        fancyIntensity: obj?.FancyColor ? obj.FancyColor.toLowerCase() : null,
        fancyOvertone: obj?.FancyColorOverTone ? obj.FancyColorOverTone.toLowerCase() : null,
        noBGM: obj?.NoBGM,
        clarity: obj?.Clarity ? obj.Clarity.toLowerCase() : null,
        cut: obj?.Cut ? obj.Cut.toLowerCase() : null,
        polish: obj?.Polish ? obj.Polish.toLowerCase() : null,
        symmetry: obj?.Symm ? obj.Symm.toLowerCase() : null,
        florescence: obj?.Fluo ? obj.Fluo.toLowerCase() : null,
        type: obj?.Type ? obj.Type.toLowerCase() : null,
        country: obj?.BranchCountry ? obj.BranchCountry.toLowerCase() : null,
        city: obj?.Branch ? obj.Branch.toLowerCase() : null,
        shade: obj?.Shade ? obj.Shade.toLowerCase() : null,
        luster: null,
        eyeClean: obj?.EC ? Number(obj.EC.replace('%', '')) : null,
        milky: null,
        inclusion: null,
        extraFacet: null,
        internalGraining: null,
        surfaceGraining: null,
        heartsAndArrows: obj?.HeartsAndArrows,
        measurement: measurement,
        length: length,
        width: width,
        height: height,
        depthPercentage: obj?.DepthPercent || obj?.DepthPercent === 0 ? Number(obj.DepthPercent) : null,
        tablePercentage: obj?.TablePercent || obj?.TablePercent === 0 ? Number(obj.TablePercent) : null,
        crownAngle: obj?.CrownAngle || obj?.CrownAngle === 0 ? Number(obj.CrownAngle) : null,
        crownHeight: obj?.CrownHeight || obj?.CrownHeight === 0 ? Number(obj.CrownHeight) : null,
        pavilionAngle: obj?.PavilionAngle || obj?.PavilionAngle === 0 ? Number(obj.PavilionAngle) : null,
        pavilionHeight: obj?.PavilionDepth || obj?.PavilionDepth === 0 ? Number(obj.PavilionDepth) : null,
        starLength: null,
        lowerHalves: null,
        girdleType: obj?.GirdleThin && obj?.GirdleThick ? `${obj.GirdleThin}, ${obj.GirdleThick}` : obj?.GirdleThin || obj?.GirdleThick,
        girdlePercentage: obj?.GirdlePercent || obj?.GirdlePercent === 0 ? Number(obj.GirdlePercent) : null,
        culetSize: obj?.CuletSize ? obj.CuletSize.toLowerCase() : null,
        ratio: ratio,
        videoLink: obj?.AmazonVideoLink || null,
        imageLink: obj?.AWSDiamondImageLink || null,
        certificateLink: certificateLink,
        rap: rapRate,
        ourPrice: ourPrice,
        ourDiscount: ourDiscount,
        metadata: {
          newBarcode: obj?.NewBarcode,
          mixBarcode: obj?.MixBarcode,
          fluoColor: obj?.FluoColor,
          fancyColor: obj?.FancyColor,
          fancyColorShortName: obj?.FancyColorShortName,
          fancyColorIntensity: obj?.FancyColorIntensity,
          fancyColorIntensityShortName: obj?.FancyColorIntensityShortName,
          fancyColorOverTone: obj?.FancyColorOverTone,
          fancyColorOverToneShortName: obj?.FancyColorOverToneShortName,
          overTone: obj?.OverTone,
          tone: obj?.Tone,
          status: obj?.Status,
          isInStock: obj?.IsInStock,
          certificateNumber: obj?.CertificateNumber,
          actualRap: obj?.RapRate,
          actualDiscount: obj?.RapnetDiscountPercent,
          actualPricePerCarat: obj?.Weight ? (obj.NetAmount || 0) / obj.Weight : 0,
          actualPrice: obj?.NetAmount,
          netRapRate: obj?.NetRapRate,
          netAmount: obj?.NetAmount,
          rapnetDiscountPercent: obj?.RapnetDiscountPercent,
          totalAmount: obj?.TotalAmount,
          offeredDiscountPercent: obj?.OfferedDiscountPercent,
          totalNetAmount: obj?.TotalNetAmount,
          girdleName: obj?.GirdleName,
          girdleCondition: obj?.GirdleCondition,
          comment: obj?.Comment,
          code: obj?.Code,
          ratio: obj?.LengthByWidthRatio,
        },
        isDeleted: false,
        notes: 'Color of diamond visible in video & image may slightly vary in actual diamond according to your display settings.',
        keyToSymbol: null,
        certificateComment: certificateComment,
        diamondType: obj.Type && Object.values(ELabGrownType).includes(obj?.Type.toLowerCase()) ? EDiamondType.LAB_GROWN_DIAMONDS : null,
        status: EDiamondStatus.AVAILABLE,
        motibaGemsComment: motibaGemsComment,
      });
    }
  }

  return parsedData;
};
