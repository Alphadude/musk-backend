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
    company?: string | null;
    contactPerson?: string | null;
    phone?: string | null;
    industrySector?: string | null;
    projectLocation?: string | null;
    totalDuration?: string | null;
    crewRequested?: boolean | null;
}
