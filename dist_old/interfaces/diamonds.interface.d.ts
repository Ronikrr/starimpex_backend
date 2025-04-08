export declare enum ESourceType {
    FILE = "file",
    MAITRI = "maitri",
    ANJALI = "anjali",
    ECOSTAR = "ecostar",
    BAPA_SITARAM = "bapa_sitaram"
}
export interface IDiamondSourceRequest {
    method: 'GET' | 'POST';
    apiURL: string;
    data?: any;
    token?: string;
    params?: Array<{
        key: string;
        value: string;
    }>;
}
export declare enum EDiamondEyeClean {
    E0 = "e0",
    E1 = "e1",
    E2 = "e2",
    E3 = "e3"
}
export declare enum EDiamondType {
    NATURAL_DIAMONDS = "natural_diamonds",
    LAB_GROWN_DIAMONDS = "lab_grown_diamonds"
}
export declare enum ELabGrownType {
    CVD = "cvd",
    HPHT = "hpht"
}
export declare enum EDiamondStatus {
    AVAILABLE = "available",
    SOLD = "sold"
}
