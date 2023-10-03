import { Product } from "./product";

export class OrderDetail {
    constructor(
        public orderId: string,
        public productId: string,
        public product: Product,
        public quantity: number,
        public price: number
    ) {}
}