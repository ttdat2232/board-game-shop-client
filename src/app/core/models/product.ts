import { ProductInformation } from "./ProductInformation";
import { Category } from "./category";
import { ProductStatus } from "./product.search";

export class Product {
    constructor(
        public id: string = "test",
        public status: ProductStatus = ProductStatus.Available,
        public createdDate: Date = new Date(),
        public thumbnailImage: string = "https://webstatic.hoyoverse.com/upload/op-public/2023/07/26/a9960f28d69aa69e11241499fd8833f4_9171149761244596116.png",
        public images: string[] = [],
        public categories: Category[] = [],
        public informations: ProductInformation[] = [],
        public price: number = 0
    ) {}
}