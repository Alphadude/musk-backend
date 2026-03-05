export interface IOrder {
    id?: number;
    orderNumber: string;
    renterName: string;
    renterEmail: string;
    equipmentId?: number | null;
    vesselId?: number | null;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status?: string;
    paymentStatus?: string;
}
