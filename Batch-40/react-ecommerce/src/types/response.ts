export interface IResponse {
    statusCode: number;
    message: string;
    data: any;
}

export interface IPagination {
    totalRecord: number;
    limit: number;
    page:number
}