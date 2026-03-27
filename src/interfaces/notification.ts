export interface INotification {
    id?: number;
    title: string;
    message: string;
    type: string;
    relatedId?: number | null;
    isRead?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
