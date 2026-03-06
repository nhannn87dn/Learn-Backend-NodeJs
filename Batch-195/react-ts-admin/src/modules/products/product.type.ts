export interface IProduct {
    _id: string;
    product_name: string;
    price: number;
    thumbnail: string;
    modelYear: number;
    stock: number;
    isNew: boolean;
    isOnSale: boolean;
}

export interface IPagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
}

export interface IProductListResponse {
    items: IProduct[];
    pagination: IPagination;
}