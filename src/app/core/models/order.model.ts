import { PaymentType } from "./create-order.model";
import { OrderDetail } from "./order-detail.model";

export class Order {
    constructor(
        public totalPrice: number,
        public phoneNumber: string,
        public address: string,
        public createdDate: Date,
        public paidDate: Date,
        public orderStatus: OrderStatus,
        public paymentType: PaymentType,
        public orderDetails: OrderDetail[],
        public id: string,
    ) {}
}

export enum OrderStatus {
    Prepare = 0,
    Shipping = 1,
    Receive = 2,
    Done = 3,
}