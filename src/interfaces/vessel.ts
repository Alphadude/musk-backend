export interface IVessel {
    id?: number;
    companyId: number;
    status?: string;
    condition?: string;
    name: string;
    type: string;
    builder?: string;
    yearBuilt?: number;
    flag?: string;
    totalHP?: number;
    maxSpeed?: number;
    economicalSpeed?: number;
    engineConfig?: string;
    length?: number;
    breadth?: number;
    depth?: number;
    clearDeckSpace?: string;
    deckCargoCapacity?: number;
    fuelConsumption?: number;
    fuelCapacity?: number;
    waterCapacity?: number;
    mainEngines?: string;
    generators?: string;
    specialEquipment?: string;
    personCapacity?: number;
    airConditioning?: string;
    additionalAmenities?: string;
    dailyRate?: number;
    monthlyRate?: number;
    images?: string; // Comma separated URLs
}
