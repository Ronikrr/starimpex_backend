import { EDiamondEyeClean } from '@/interfaces/diamonds.interface';
import { diamondHeader, orderHeader, profitHeader, purchaseHeader } from './xlsxUtil';
import { EFormatterType } from '@/interfaces/export.interface';

export const roundFloatValues = (value: number, precision: number) => {
  const roundBy = Math.pow(10, precision);

  return Number(Math.round(value * roundBy) / roundBy);
};

export const calculateOurPrice = (netAmount: number, markup: number) => {
  return roundFloatValues(Number(netAmount + netAmount * (markup / 100)), 2);
};

export const calculateOurDiscount = (ourPrice: number, rapRate: number, weight: number) => {
  return roundFloatValues(Number((ourPrice * 100) / (rapRate * weight) - 100), 4);
};

export const calculatePricePerCarat = (ourPrice: number, weight: number) => {
  return roundFloatValues(Number(ourPrice / weight), 2);
};

export const getEyeCleanCondition = (eyeClean: EDiamondEyeClean) => {
  switch (eyeClean) {
    case EDiamondEyeClean.E0:
      return { $eq: 100 };
    case EDiamondEyeClean.E1:
      return { $gt: 80, $lt: 100 };
    case EDiamondEyeClean.E2:
      return { $gt: 70, $lte: 80 };
    case EDiamondEyeClean.E3:
      return { $lte: 70 };
  }
};

export const formatDate = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
};

export const getEyeCleanValue = (eyeClean: number) => {
  if (eyeClean === 100) {
    return EDiamondEyeClean.E0;
  }
  if (eyeClean > 80) {
    return EDiamondEyeClean.E1;
  }
  if (eyeClean > 70) {
    return EDiamondEyeClean.E2;
  }
  return EDiamondEyeClean.E3;
};

export const formatValue = (
  value: any,
  formatterType: EFormatterType,
  searchValue?: string,
  newValue?: string,
  webURL?: string,
  getValue?: (...args: any) => any,
) => {
  switch (formatterType) {
    case EFormatterType.ALL_UPPERCASE:
      return value ? value.toUpperCase() : '-';

    case EFormatterType.DIGIT:
      return value || value === 0 ? Number(value) : '-';

    case EFormatterType.REPLACE_WORD:
      return value ? value.replace(searchValue, newValue).toUpperCase() : '-';

    case EFormatterType.LINK:
      return value ? { hyperlink: `${webURL}/${value}`, text: 'View' } : '-';

    case EFormatterType.YES_NO:
      return value ? 'YES' : 'NO';

    case EFormatterType.FIRST_LETTER_UPPERCASE:
      return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '-';

    case EFormatterType.CUSTOM_FUNCTION:
      return !isEmpty(value) ? getValue(value) || '-' : '-';

    default:
      return value ? value : '-';
  }
};

export const formatDiamondToExcelData = (diamonds: Array<any>): Array<any> => {
  const finalDiamondData = [];
  const headerKeys = diamondHeader.map(headerData => headerData);

  for (let index = 0; index < diamonds.length; index++) {
    const data: any = { [headerKeys[0].key]: index + 1 };

    for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
      const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];

      let value = '';
      if (typeof getterKey === 'string') {
        const valueFromKey = isMetadata ? diamonds[index].metadata[getterKey] : diamonds[index][getterKey];
        value = formatValue(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
      } else {
        const values = getterKey.map(getter => {
          return formatValue(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
        });

        value = values.join(', ');
      }

      data[key] = value;
    }

    finalDiamondData.push(data);
  }

  const startRow = 5;
  const endRow = startRow + diamonds.length - 1;
  const summaryRow = startRow + diamonds.length;
  const caratRow = `I${startRow}:I${endRow}`;
  const rapRow = `P${startRow}:P${endRow}`;
  const amountRow = `S${startRow}:S${endRow}`;
  const totalCaratCell = `I${summaryRow}`;
  const totalRapCell = `P${summaryRow}`;
  const totalPricePerCaratCell = `R${summaryRow}`;
  const totalAmountCell = `S${summaryRow}`;

  finalDiamondData.push({
    [headerKeys[0].key]: diamonds.length,
    [headerKeys[8].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
    [headerKeys[15].key]: {
      formula: `ROUND(SUMPRODUCT(${rapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
    },
    [headerKeys[16].key]: {
      formula: `ROUND(IF(${totalRapCell}<> 0,ROUND((${totalRapCell}-${totalPricePerCaratCell})/${totalRapCell}*-100,4),0),4)`,
    },
    [headerKeys[17].key]: { formula: `ROUND(${totalAmountCell}/${totalCaratCell},2)` },
    [headerKeys[18].key]: { formula: `ROUND(SUBTOTAL(9,${amountRow}),2)` },
  });

  return finalDiamondData;
};

export const formatOrderToExcelData = (diamonds: Array<any>): Array<any> => {
  const finalDiamondData = [];
  const headerKeys = orderHeader.map(headerData => headerData);

  for (let index = 0; index < diamonds.length; index++) {
    const data: any = { [headerKeys[0].key]: index + 1 };

    for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
      const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];

      let value = '';
      if (typeof getterKey === 'string') {
        const valueFromKey = isMetadata ? (diamonds[index]?.metadata ? diamonds[index].metadata[getterKey] : '-') : diamonds[index][getterKey];
        value = formatValue(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
      } else {
        const values = getterKey.map(getter => {
          return formatValue(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
        });

        value = values.join(', ');
      }

      data[key] = value;
    }

    finalDiamondData.push(data);
  }

  const startRow = 6;
  const endRow = startRow + diamonds.length - 1;
  const summaryRow = startRow + diamonds.length;
  const caratRow = `J${startRow}:J${endRow}`;
  const rapRow = `Q${startRow}:Q${endRow}`;
  const amountRow = `T${startRow}:T${endRow}`;
  const totalCaratCell = `J${summaryRow}`;
  const totalRapCell = `Q${summaryRow}`;
  const totalPricePerCaratCell = `S${summaryRow}`;
  const totalAmountCell = `T${summaryRow}`;

  finalDiamondData.push({
    [headerKeys[0].key]: diamonds.length,
    [headerKeys[9].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
    [headerKeys[16].key]: {
      formula: `ROUND(SUMPRODUCT(${rapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
    },
    [headerKeys[17].key]: {
      formula: `ROUND(IF(${totalRapCell}<> 0,ROUND((${totalRapCell}-${totalPricePerCaratCell})/${totalRapCell}*-100,4),0),4)`,
    },
    [headerKeys[18].key]: { formula: `ROUND(${totalAmountCell}/${totalCaratCell},2)` },
    [headerKeys[19].key]: { formula: `ROUND(SUBTOTAL(9,${amountRow}),2)` },
  });

  return finalDiamondData;
};

export const formatPurchaseToExcelData = (diamonds: Array<any>): Array<any> => {
  const finalDiamondData = [];
  const headerKeys = purchaseHeader.map(headerData => headerData);

  for (let index = 0; index < diamonds.length; index++) {
    const data: any = { [headerKeys[0].key]: index + 1 };

    for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
      const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];

      let value = '';
      if (typeof getterKey === 'string') {
        const valueFromKey = isMetadata ? (diamonds[index]?.metadata ? diamonds[index].metadata[getterKey] : '-') : diamonds[index][getterKey];
        value = formatValue(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
      } else {
        const values = getterKey.map(getter => {
          return formatValue(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
        });

        value = values.join(', ');
      }

      data[key] = value;
    }

    finalDiamondData.push(data);
  }

  const startRow = 6;
  const endRow = startRow + diamonds.length - 1;
  const summaryRow = startRow + diamonds.length;
  const caratRow = `K${startRow}:K${endRow}`;
  const rapRow = `R${startRow}:R${endRow}`;
  const amountRow = `U${startRow}:U${endRow}`;
  const totalCaratCell = `K${summaryRow}`;
  const totalRapCell = `R${summaryRow}`;
  const totalPricePerCaratCell = `T${summaryRow}`;
  const totalAmountCell = `U${summaryRow}`;

  finalDiamondData.push({
    [headerKeys[0].key]: diamonds.length,
    [headerKeys[10].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
    [headerKeys[17].key]: {
      formula: `ROUND(SUMPRODUCT(${rapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
    },
    [headerKeys[18].key]: {
      formula: `ROUND(IF(${totalRapCell}<> 0,ROUND((${totalRapCell}-${totalPricePerCaratCell})/${totalRapCell}*-100,4),0),4)`,
    },
    [headerKeys[19].key]: { formula: `ROUND(${totalAmountCell}/${totalCaratCell},2)` },
    [headerKeys[20].key]: { formula: `ROUND(SUBTOTAL(9,${amountRow}),2)` },
  });

  return finalDiamondData;
};

export const formatProfitToExcelData = (diamonds: Array<any>): Array<any> => {
  const finalDiamondData = [];
  const headerKeys = profitHeader.map(headerData => headerData);

  for (let index = 0; index < diamonds.length; index++) {
    const data: any = { [headerKeys[0].key]: index + 1 };

    for (let headerIndex = 1; headerIndex < headerKeys.length; headerIndex++) {
      const { key, formatterType, getterKey, newValue, searchValue, getValue, webURL, isMetadata = false } = headerKeys[headerIndex];

      let value = '';
      if (typeof getterKey === 'string') {
        const valueFromKey = isMetadata ? (diamonds[index]?.metadata ? diamonds[index].metadata[getterKey] : '-') : diamonds[index][getterKey];
        value = formatValue(valueFromKey, formatterType, searchValue, newValue, webURL, getValue);
      } else {
        const values = getterKey.map(getter => {
          return formatValue(diamonds[index][getter], formatterType, searchValue, newValue, webURL, getValue);
        });

        value = values.join(', ');
      }

      data[key] = value;
    }

    finalDiamondData.push(data);
  }

  const startRow = 6;
  const endRow = startRow + diamonds.length - 1;
  const summaryRow = startRow + diamonds.length;
  const caratRow = `J${startRow}:J${endRow}`;
  const orderRapRow = `Q${startRow}:Q${endRow}`;
  const orderAmountRow = `W${startRow}:W${endRow}`;
  const totalCaratCell = `J${summaryRow}`;
  const orderTotalRapCell = `Q${summaryRow}`;
  const orderTotalPricePerCaratCell = `U${summaryRow}`;
  const orderTotalAmountCell = `W${summaryRow}`;
  const purchaseRapRow = `R${startRow}:R${endRow}`;
  const purchaseAmountRow = `X${startRow}:X${endRow}`;
  const purchaseTotalRapCell = `R${summaryRow}`;
  const purchaseTotalPricePerCaratCell = `V${summaryRow}`;
  const purchaseTotalAmountCell = `X${summaryRow}`;
  const profitTotalAmountRow = `Y${startRow}:Y${endRow}`;

  finalDiamondData.push({
    [headerKeys[0].key]: diamonds.length,
    [headerKeys[9].key]: { formula: `ROUND(SUBTOTAL(9,${caratRow}), 2)` },
    [headerKeys[16].key]: {
      formula: `ROUND(SUMPRODUCT(${orderRapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
    },
    [headerKeys[17].key]: {
      formula: `ROUND(SUMPRODUCT(${purchaseRapRow}, SUBTOTAL(9,OFFSET(${caratRow}, ROW(${caratRow})-MIN(ROW(${caratRow})),0,1)))/ ${totalCaratCell},2)`,
    },
    [headerKeys[18].key]: {
      formula: `ROUND(IF(${orderTotalRapCell}<> 0,ROUND((${orderTotalRapCell}-${orderTotalPricePerCaratCell})/${orderTotalRapCell}*-100,4),0),4)`,
    },
    [headerKeys[19].key]: {
      formula: `ROUND(IF(${purchaseTotalRapCell}<> 0,ROUND((${purchaseTotalRapCell}-${purchaseTotalPricePerCaratCell})/${purchaseTotalRapCell}*-100,4),0),4)`,
    },
    [headerKeys[20].key]: { formula: `ROUND(${orderTotalAmountCell}/${totalCaratCell},2)` },
    [headerKeys[21].key]: { formula: `ROUND(${purchaseTotalAmountCell}/${totalCaratCell},2)` },
    [headerKeys[22].key]: { formula: `ROUND(SUBTOTAL(9,${orderAmountRow}),2)` },
    [headerKeys[23].key]: { formula: `ROUND(SUBTOTAL(9,${purchaseAmountRow}),2)` },
    [headerKeys[24].key]: { formula: `ROUND(SUBTOTAL(9,${profitTotalAmountRow}),2)` },
  });

  return finalDiamondData;
};

export const calculateRatioByShape = (shape: string, width: number, length: number): number => {
  if (!width || !length) {
    return 0;
  }

  if (shape === 'heart') {
    return Number((width / length).toFixed(2));
  }

  return Number((length / width).toFixed(2));
};

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};
