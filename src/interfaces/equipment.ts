export interface IEquipment {
    id?: number;
    companyId: number;
    status?: string;
    condition?: string;
    name: string;
    category: string;
    details?: string;
    weight?: number;
    yearManufactured?: number;
    hourlyRate?: number;
    dailyRate?: number;
    monthlyRate?: number;
    images?: string; // Comma separated URLs
}
