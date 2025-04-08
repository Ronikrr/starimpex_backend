import { APP_URL } from '@/config';
import { EFormatterType } from '@/interfaces/export.interface';
import { formatDate, getEyeCleanValue } from './helpers';

export const diamondHeader = [
  { key: 'srNo', header: 'Sr. No' },
  { key: 'stoneId', header: 'Stone ID', getterKey: 'stoneNo' },
  { key: 'videoLink', header: 'Video', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-video` },
  { key: 'certificateLink', header: 'Certificate', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-certificate` },
  { key: 'lab', header: 'Lab', getterKey: 'lab', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'type', header: 'Type', getterKey: 'type', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'inscription', header: 'Inscription', getterKey: 'inscription', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shape', header: 'Shape', getterKey: 'shape', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'carat', header: 'Carat', style: { numFmt: '0.00' }, getterKey: 'caratWeight', formatterType: EFormatterType.DIGIT },
  { key: 'color', header: 'Color', getterKey: 'color', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'clarity', header: 'Clarity', getterKey: 'clarity', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'cut', header: 'Cut', getterKey: 'cut', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'polish', header: 'Polish', getterKey: 'polish', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'symmetry', header: 'Symmetry', getterKey: 'symmetry', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'fluorescence', header: 'Fluorescence', getterKey: 'fluorescence', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'rap', header: 'Rap $', style: { numFmt: '0.00' }, getterKey: 'rap', formatterType: EFormatterType.DIGIT },
  { key: 'discount', header: 'Discount %', style: { numFmt: '0.0000' }, getterKey: 'ourDiscount', formatterType: EFormatterType.DIGIT },
  {
    key: 'pricePerCarat',
    header: 'Price $ / Carat',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'pricePerCarat',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'amount', header: 'Total Amount $', style: { numFmt: '_($* 0.00_);' }, getterKey: 'ourPrice', formatterType: EFormatterType.DIGIT },
  { key: 'location', header: 'Location', getterKey: ['city', 'country'], formatterType: EFormatterType.FIRST_LETTER_UPPERCASE },
  { key: 'measurement', header: 'Measurement', getterKey: 'measurement' },
  { key: 'depthPercentage', header: 'Depth %', style: { numFmt: '0.00' }, getterKey: 'depthPercentage', formatterType: EFormatterType.DIGIT },
  { key: 'tablePercentage', header: 'Table %', style: { numFmt: '0.00' }, getterKey: 'tablePercentage', formatterType: EFormatterType.DIGIT },
  { key: 'heartsAndArrows', header: 'Hearts and Arrows', getterKey: 'heartsAndArrows', formatterType: EFormatterType.YES_NO },
  { key: 'inclusion', header: 'Inclusion', getterKey: 'inclusion', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shade', header: 'Shade', getterKey: 'shade', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'milky', header: 'Milky', getterKey: 'milky' },
  { key: 'luster', header: 'Luster', getterKey: 'luster' },
  { key: 'extraFacet', header: 'Extra Facet', getterKey: 'extraFacet' },
  { key: 'internalGraining', header: 'Internal Graining', getterKey: 'internalGraining' },
  { key: 'surfaceGraining', header: 'Surface Graining', getterKey: 'surfaceGraining' },
  {
    key: 'eyeClean',
    header: 'Eye Clean',
    getterKey: 'eyeClean',
    formatterType: EFormatterType.CUSTOM_FUNCTION,
    getValue: function (value: any) {
      return getEyeCleanValue(value).toUpperCase();
    },
  },
  { key: 'ratio', header: 'Ratio', style: { numFmt: '0.00' }, getterKey: 'ratio', formatterType: EFormatterType.DIGIT },
  { key: 'length', header: 'Length', style: { numFmt: '0.00' }, getterKey: 'length', formatterType: EFormatterType.DIGIT },
  { key: 'width', header: 'Width', style: { numFmt: '0.00' }, getterKey: 'width', formatterType: EFormatterType.DIGIT },
  { key: 'height', header: 'Height', style: { numFmt: '0.00' }, getterKey: 'height', formatterType: EFormatterType.DIGIT },
  { key: 'crownAngle', header: 'Crown Angle', style: { numFmt: '0.00' }, getterKey: 'crownAngle', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionAngle', header: 'Pavilion Angle', style: { numFmt: '0.00' }, getterKey: 'pavilionAngle', formatterType: EFormatterType.DIGIT },
  { key: 'crownHeight', header: 'Crown Height', style: { numFmt: '0.00' }, getterKey: 'crownHeight', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionHeight', header: 'Pavilion Height', style: { numFmt: '0.00' }, getterKey: 'pavilionHeight', formatterType: EFormatterType.DIGIT },
  { key: 'starLength', header: 'Star Length', getterKey: 'starLength' },
  { key: 'lowerHalves', header: 'Lower Halves', getterKey: 'lowerHalves' },
  { key: 'girdleCondition', header: 'Girdle Condition', getterKey: 'girdleCondition', formatterType: EFormatterType.ALL_UPPERCASE, isMetadata: true },
  {
    key: 'girdlePercentage',
    header: 'Girdle Percentage',
    style: { numFmt: '0.00' },
    getterKey: 'girdlePercentage',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'girdleType', header: 'Girdle Type', getterKey: 'girdleType', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'culet', header: 'Culet', getterKey: 'culetSize', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'status', header: 'Status', getterKey: 'status', formatterType: EFormatterType.REPLACE_WORD, searchValue: '_', newValue: ' ' },
];

export const orderHeader = [
  { key: 'srNo', header: 'Sr. No' },
  { key: 'orderID', header: 'Order ID', getterKey: 'orderNumber' },
  { key: 'stoneId', header: 'Stone ID', getterKey: 'stoneNo' },
  { key: 'videoLink', header: 'Video', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-video` },
  { key: 'certificateLink', header: 'Certificate', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-certificate` },
  { key: 'lab', header: 'Lab', getterKey: 'lab', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'type', header: 'Type', getterKey: 'type', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'inscription', header: 'Inscription', getterKey: 'inscription', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shape', header: 'Shape', getterKey: 'shape', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'carat', header: 'Carat', style: { numFmt: '0.00' }, getterKey: 'caratWeight', formatterType: EFormatterType.DIGIT },
  { key: 'color', header: 'Color', getterKey: 'color', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'clarity', header: 'Clarity', getterKey: 'clarity', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'cut', header: 'Cut', getterKey: 'cut', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'polish', header: 'Polish', getterKey: 'polish', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'symmetry', header: 'Symmetry', getterKey: 'symmetry', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'fluorescence', header: 'Fluorescence', getterKey: 'fluorescence', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'rap', header: 'Rap $', style: { numFmt: '0.00' }, getterKey: 'rap', formatterType: EFormatterType.DIGIT },
  { key: 'discount', header: 'Discount %', style: { numFmt: '0.0000' }, getterKey: 'ourDiscount', formatterType: EFormatterType.DIGIT },
  {
    key: 'pricePerCarat',
    header: 'Price $ / Carat',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'pricePerCarat',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'amount', header: 'Total Amount $', style: { numFmt: '_($* 0.00_);' }, getterKey: 'ourPrice', formatterType: EFormatterType.DIGIT },
  { key: 'location', header: 'Location', getterKey: ['city', 'country'], formatterType: EFormatterType.FIRST_LETTER_UPPERCASE },
  { key: 'measurement', header: 'Measurement', getterKey: 'measurement' },
  { key: 'depthPercentage', header: 'Depth %', style: { numFmt: '0.00' }, getterKey: 'depthPercentage', formatterType: EFormatterType.DIGIT },
  { key: 'tablePercentage', header: 'Table %', style: { numFmt: '0.00' }, getterKey: 'tablePercentage', formatterType: EFormatterType.DIGIT },
  { key: 'heartsAndArrows', header: 'Hearts and Arrows', getterKey: 'heartsAndArrows', formatterType: EFormatterType.YES_NO },
  { key: 'inclusion', header: 'Inclusion', getterKey: 'inclusion', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shade', header: 'Shade', getterKey: 'shade', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'milky', header: 'Milky', getterKey: 'milky' },
  { key: 'luster', header: 'Luster', getterKey: 'luster' },
  { key: 'extraFacet', header: 'Extra Facet', getterKey: 'extraFacet' },
  { key: 'internalGraining', header: 'Internal Graining', getterKey: 'internalGraining' },
  { key: 'surfaceGraining', header: 'Surface Graining', getterKey: 'surfaceGraining' },
  {
    key: 'eyeClean',
    header: 'Eye Clean',
    getterKey: 'eyeClean',
    formatterType: EFormatterType.CUSTOM_FUNCTION,
    getValue: function (value: any) {
      return getEyeCleanValue(value).toUpperCase();
    },
  },
  { key: 'ratio', header: 'Ratio', style: { numFmt: '0.00' }, getterKey: 'ratio', formatterType: EFormatterType.DIGIT },
  { key: 'length', header: 'Length', style: { numFmt: '0.00' }, getterKey: 'length', formatterType: EFormatterType.DIGIT },
  { key: 'width', header: 'Width', style: { numFmt: '0.00' }, getterKey: 'width', formatterType: EFormatterType.DIGIT },
  { key: 'height', header: 'Height', style: { numFmt: '0.00' }, getterKey: 'height', formatterType: EFormatterType.DIGIT },
  { key: 'crownAngle', header: 'Crown Angle', style: { numFmt: '0.00' }, getterKey: 'crownAngle', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionAngle', header: 'Pavilion Angle', style: { numFmt: '0.00' }, getterKey: 'pavilionAngle', formatterType: EFormatterType.DIGIT },
  { key: 'crownHeight', header: 'Crown Height', style: { numFmt: '0.00' }, getterKey: 'crownHeight', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionHeight', header: 'Pavilion Height', style: { numFmt: '0.00' }, getterKey: 'pavilionHeight', formatterType: EFormatterType.DIGIT },
  { key: 'starLength', header: 'Star Length', getterKey: 'starLength' },
  { key: 'lowerHalves', header: 'Lower Halves', getterKey: 'lowerHalves' },
  { key: 'girdleCondition', header: 'Girdle Condition', getterKey: 'girdleCondition', formatterType: EFormatterType.ALL_UPPERCASE, isMetadata: true },
  {
    key: 'girdlePercentage',
    header: 'Girdle Percentage',
    style: { numFmt: '0.00' },
    getterKey: 'girdlePercentage',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'girdleType', header: 'Girdle Type', getterKey: 'girdleType', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'culet', header: 'Culet', getterKey: 'culetSize', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'status', header: 'Status', getterKey: 'status', formatterType: EFormatterType.REPLACE_WORD, searchValue: '_', newValue: ' ' },
];

export const purchaseHeader = [
  { key: 'srNo', header: 'Sr. No' },
  {
    key: 'purchaseDate',
    header: 'Purchase Date',
    getterKey: 'date',
    formatterType: EFormatterType.CUSTOM_FUNCTION,
    getValue: function (value: any) {
      return formatDate(new Date(value));
    },
  },
  { key: 'orderID', header: 'Order ID', getterKey: 'orderNumber' },
  { key: 'stoneId', header: 'Stone ID', getterKey: 'stoneNo' },
  { key: 'videoLink', header: 'Video', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-video` },
  { key: 'certificateLink', header: 'Certificate', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-certificate` },
  { key: 'lab', header: 'Lab', getterKey: 'lab', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'type', header: 'Type', getterKey: 'type', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'inscription', header: 'Inscription', getterKey: 'inscription', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shape', header: 'Shape', getterKey: 'shape', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'carat', header: 'Carat', style: { numFmt: '0.00' }, getterKey: 'caratWeight', formatterType: EFormatterType.DIGIT },
  { key: 'color', header: 'Color', getterKey: 'color', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'clarity', header: 'Clarity', getterKey: 'clarity', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'cut', header: 'Cut', getterKey: 'cut', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'polish', header: 'Polish', getterKey: 'polish', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'symmetry', header: 'Symmetry', getterKey: 'symmetry', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'fluorescence', header: 'Fluorescence', getterKey: 'fluorescence', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'rap', header: 'Rap $', style: { numFmt: '0.00' }, getterKey: 'finalRap', formatterType: EFormatterType.DIGIT },
  {
    key: 'discount',
    header: 'Discount %',
    style: { numFmt: '0.0000' },
    getterKey: 'finalDiscount',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'pricePerCarat',
    header: 'Price $ / Carat',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'finalPrice',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'amount',
    header: 'Total Amount $',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'finalTotalPrice',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'location', header: 'Location', getterKey: ['city', 'country'], formatterType: EFormatterType.FIRST_LETTER_UPPERCASE },
  { key: 'measurement', header: 'Measurement', getterKey: 'measurement' },
  { key: 'depthPercentage', header: 'Depth %', style: { numFmt: '0.00' }, getterKey: 'depthPercentage', formatterType: EFormatterType.DIGIT },
  { key: 'tablePercentage', header: 'Table %', style: { numFmt: '0.00' }, getterKey: 'tablePercentage', formatterType: EFormatterType.DIGIT },
  { key: 'heartsAndArrows', header: 'Hearts and Arrows', getterKey: 'heartsAndArrows', formatterType: EFormatterType.YES_NO },
  { key: 'inclusion', header: 'Inclusion', getterKey: 'inclusion', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shade', header: 'Shade', getterKey: 'shade', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'milky', header: 'Milky', getterKey: 'milky' },
  { key: 'luster', header: 'Luster', getterKey: 'luster' },
  { key: 'extraFacet', header: 'Extra Facet', getterKey: 'extraFacet' },
  { key: 'internalGraining', header: 'Internal Graining', getterKey: 'internalGraining' },
  { key: 'surfaceGraining', header: 'Surface Graining', getterKey: 'surfaceGraining' },
  {
    key: 'eyeClean',
    header: 'Eye Clean',
    getterKey: 'eyeClean',
    formatterType: EFormatterType.CUSTOM_FUNCTION,
    getValue: function (value: any) {
      return getEyeCleanValue(value).toUpperCase();
    },
  },
  { key: 'ratio', header: 'Ratio', style: { numFmt: '0.00' }, getterKey: 'ratio', formatterType: EFormatterType.DIGIT },
  { key: 'length', header: 'Length', style: { numFmt: '0.00' }, getterKey: 'length', formatterType: EFormatterType.DIGIT },
  { key: 'width', header: 'Width', style: { numFmt: '0.00' }, getterKey: 'width', formatterType: EFormatterType.DIGIT },
  { key: 'height', header: 'Height', style: { numFmt: '0.00' }, getterKey: 'height', formatterType: EFormatterType.DIGIT },
  { key: 'crownAngle', header: 'Crown Angle', style: { numFmt: '0.00' }, getterKey: 'crownAngle', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionAngle', header: 'Pavilion Angle', style: { numFmt: '0.00' }, getterKey: 'pavilionAngle', formatterType: EFormatterType.DIGIT },
  { key: 'crownHeight', header: 'Crown Height', style: { numFmt: '0.00' }, getterKey: 'crownHeight', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionHeight', header: 'Pavilion Height', style: { numFmt: '0.00' }, getterKey: 'pavilionHeight', formatterType: EFormatterType.DIGIT },
  { key: 'starLength', header: 'Star Length', getterKey: 'starLength' },
  { key: 'lowerHalves', header: 'Lower Halves', getterKey: 'lowerHalves' },
  { key: 'girdleCondition', header: 'Girdle Condition', getterKey: 'girdleCondition', formatterType: EFormatterType.ALL_UPPERCASE, isMetadata: true },
  {
    key: 'girdlePercentage',
    header: 'Girdle Percentage',
    style: { numFmt: '0.00' },
    getterKey: 'girdlePercentage',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'girdleType', header: 'Girdle Type', getterKey: 'girdleType', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'culet', header: 'Culet', getterKey: 'culetSize', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'status', header: 'Status', getterKey: 'status', formatterType: EFormatterType.REPLACE_WORD, searchValue: '_', newValue: ' ' },
];

export const profitHeader = [
  { key: 'srNo', header: 'Sr. No' },
  { key: 'orderID', header: 'Order ID', getterKey: 'orderNumber' },
  { key: 'stoneId', header: 'Stone ID', getterKey: 'stoneNo' },
  { key: 'videoLink', header: 'Video', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-video` },
  { key: 'certificateLink', header: 'Certificate', getterKey: '_id', formatterType: EFormatterType.LINK, webURL: `${APP_URL}/view-certificate` },
  { key: 'lab', header: 'Lab', getterKey: 'lab', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'type', header: 'Type', getterKey: 'type', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'inscription', header: 'Inscription', getterKey: 'inscription', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shape', header: 'Shape', getterKey: 'shape', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'carat', header: 'Carat', style: { numFmt: '0.00' }, getterKey: 'caratWeight', formatterType: EFormatterType.DIGIT },
  { key: 'color', header: 'Color', getterKey: 'color', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'clarity', header: 'Clarity', getterKey: 'clarity', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'cut', header: 'Cut', getterKey: 'cut', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'polish', header: 'Polish', getterKey: 'polish', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'symmetry', header: 'Symmetry', getterKey: 'symmetry', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'fluorescence', header: 'Fluorescence', getterKey: 'fluorescence', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'orderRap', header: 'Order Rap $', style: { numFmt: '0.00' }, getterKey: 'rap', formatterType: EFormatterType.DIGIT },
  { key: 'purchaseRap', header: 'Purchase Rap $', style: { numFmt: '0.00' }, getterKey: 'finalRap', formatterType: EFormatterType.DIGIT },
  { key: 'orderDiscount', header: 'Order Discount %', style: { numFmt: '0.0000' }, getterKey: 'ourDiscount', formatterType: EFormatterType.DIGIT },
  {
    key: 'purchaseDiscount',
    header: 'Purchase Discount %',
    style: { numFmt: '0.0000' },
    getterKey: 'finalDiscount',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'orderPricePerCarat',
    header: 'Order Price $ / Carat',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'pricePerCarat',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'purchasePricePerCarat',
    header: 'Purchase Price $ / Carat',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'finalPrice',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'orderAmount',
    header: 'Order  Amount $',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'ourPrice',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'purchaseAmount',
    header: 'Purchase  Amount $',
    style: { numFmt: '_($* 0.00_);' },
    getterKey: 'finalTotalPrice',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'profit',
    header: 'Profit $',
    style: { numFmt: '_($* 0.00_);_($* -0.00_);' },
    getterKey: 'profit',
    formatterType: EFormatterType.DIGIT,
  },
  {
    key: 'supplierName',
    header: 'Supplier Name',
    getterKey: 'supplierName',
  },
  {
    key: 'supplierAddress',
    header: 'Supplier Address',
    getterKey: 'supplierAddress',
  },
  {
    key: 'description',
    header: 'Description',
    getterKey: 'description',
  },
  { key: 'location', header: 'Location', getterKey: ['city', 'country'], formatterType: EFormatterType.FIRST_LETTER_UPPERCASE },
  { key: 'measurement', header: 'Measurement', getterKey: 'measurement' },
  { key: 'depthPercentage', header: 'Depth %', style: { numFmt: '0.00' }, getterKey: 'depthPercentage', formatterType: EFormatterType.DIGIT },
  { key: 'tablePercentage', header: 'Table %', style: { numFmt: '0.00' }, getterKey: 'tablePercentage', formatterType: EFormatterType.DIGIT },
  { key: 'heartsAndArrows', header: 'Hearts and Arrows', getterKey: 'heartsAndArrows', formatterType: EFormatterType.YES_NO },
  { key: 'inclusion', header: 'Inclusion', getterKey: 'inclusion', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'shade', header: 'Shade', getterKey: 'shade', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'milky', header: 'Milky', getterKey: 'milky' },
  { key: 'luster', header: 'Luster', getterKey: 'luster' },
  { key: 'extraFacet', header: 'Extra Facet', getterKey: 'extraFacet' },
  { key: 'internalGraining', header: 'Internal Graining', getterKey: 'internalGraining' },
  { key: 'surfaceGraining', header: 'Surface Graining', getterKey: 'surfaceGraining' },
  {
    key: 'eyeClean',
    header: 'Eye Clean',
    getterKey: 'eyeClean',
    formatterType: EFormatterType.CUSTOM_FUNCTION,
    getValue: function (value: any) {
      return getEyeCleanValue(value).toUpperCase();
    },
  },
  { key: 'ratio', header: 'Ratio', style: { numFmt: '0.00' }, getterKey: 'ratio', formatterType: EFormatterType.DIGIT },
  { key: 'length', header: 'Length', style: { numFmt: '0.00' }, getterKey: 'length', formatterType: EFormatterType.DIGIT },
  { key: 'width', header: 'Width', style: { numFmt: '0.00' }, getterKey: 'width', formatterType: EFormatterType.DIGIT },
  { key: 'height', header: 'Height', style: { numFmt: '0.00' }, getterKey: 'height', formatterType: EFormatterType.DIGIT },
  { key: 'crownAngle', header: 'Crown Angle', style: { numFmt: '0.00' }, getterKey: 'crownAngle', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionAngle', header: 'Pavilion Angle', style: { numFmt: '0.00' }, getterKey: 'pavilionAngle', formatterType: EFormatterType.DIGIT },
  { key: 'crownHeight', header: 'Crown Height', style: { numFmt: '0.00' }, getterKey: 'crownHeight', formatterType: EFormatterType.DIGIT },
  { key: 'pavilionHeight', header: 'Pavilion Height', style: { numFmt: '0.00' }, getterKey: 'pavilionHeight', formatterType: EFormatterType.DIGIT },
  { key: 'starLength', header: 'Star Length', getterKey: 'starLength' },
  { key: 'lowerHalves', header: 'Lower Halves', getterKey: 'lowerHalves' },
  { key: 'girdleCondition', header: 'Girdle Condition', getterKey: 'girdleCondition', formatterType: EFormatterType.ALL_UPPERCASE, isMetadata: true },
  {
    key: 'girdlePercentage',
    header: 'Girdle Percentage',
    style: { numFmt: '0.00' },
    getterKey: 'girdlePercentage',
    formatterType: EFormatterType.DIGIT,
  },
  { key: 'girdleType', header: 'Girdle Type', getterKey: 'girdleType', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'culet', header: 'Culet', getterKey: 'culetSize', formatterType: EFormatterType.ALL_UPPERCASE },
  { key: 'status', header: 'Status', getterKey: 'status', formatterType: EFormatterType.REPLACE_WORD, searchValue: '_', newValue: ' ' },
];
