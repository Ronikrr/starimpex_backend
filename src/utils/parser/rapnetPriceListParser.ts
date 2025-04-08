export const parseRapNetPriceListData = (dataList: Array<any>) => {
  if (!dataList || dataList.length === 0) {
    return [];
  }

  const parsedData = [];
  for (let index = 0; index < dataList.length; index++) {
    const rapNetPriceData = dataList[index];

    const data = {
      shape: rapNetPriceData?.shape ? String(rapNetPriceData.shape).toLowerCase().trim() : null,
      lowSize: rapNetPriceData?.low_size || rapNetPriceData?.low_size === 0 ? Number(rapNetPriceData.low_size) : null,
      highSize: rapNetPriceData?.high_size || rapNetPriceData?.high_size === 0 ? Number(rapNetPriceData.high_size) : null,
      color: rapNetPriceData?.color ? String(rapNetPriceData.color).toLowerCase().trim() : null,
      clarity: rapNetPriceData?.clarity ? String(rapNetPriceData.clarity).toLowerCase().trim() : null,
      price: rapNetPriceData?.caratprice || rapNetPriceData?.caratprice === 0 ? Number(rapNetPriceData.caratprice) : null,
      rapDate: rapNetPriceData?.date,
    };

    parsedData.push(data);
  }

  return parsedData;
};
