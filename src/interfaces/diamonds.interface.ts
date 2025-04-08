export enum ESourceType {
  FILE = 'file',
  MAITRI = 'maitri',
  ANJALI = 'anjali',
  ECOSTAR = 'ecostar',
  BAPA_SITARAM = 'bapa_sitaram',
}

export interface IDiamondSourceRequest {
  method: 'GET' | 'POST';
  apiURL: string;
  data?: any;
  token?: string;
  params?: Array<{ key: string; value: string }>;
}

export enum EDiamondEyeClean {
  E0 = 'e0',
  E1 = 'e1',
  E2 = 'e2',
  E3 = 'e3',
}

export enum EDiamondType {
  NATURAL_DIAMONDS = 'natural_diamonds',
  LAB_GROWN_DIAMONDS = 'lab_grown_diamonds',
}

export enum ELabGrownType {
  CVD = 'cvd',
  HPHT = 'hpht',
}

export enum EDiamondStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
}
