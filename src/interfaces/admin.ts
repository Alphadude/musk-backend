export interface IAdmin {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: string;
    status?: string;
    lastLogin?: Date | null;
}
