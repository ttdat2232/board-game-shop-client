export class SearchProduct {
    constructor(
        public orderBy: ProductOrderBy = ProductOrderBy.CreatedDate,
        public sort: Sort = Sort.Descending,
        public categories?: string[],
        public statuses?: ProductStatus[],
        public minPrice?: number,
        public maxPrice?: number,
        public name?: string,
        public pageSize: number = 4,
        public pageIndex: number = 0,
    ) { }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }
}
export enum ProductStatus {
    Available = 0,
    Unvailable = 1,
    Hide = 2,
    Remove = 3,
}
export enum ProductOrderBy {
    CreatedDate,
    Id
}

export enum Sort {
    Ascending,
    Descending
}