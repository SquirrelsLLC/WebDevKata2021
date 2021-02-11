export interface IStoreActionResponse<T> {
    success: boolean;
    reason?: string;
    data?: T;
}