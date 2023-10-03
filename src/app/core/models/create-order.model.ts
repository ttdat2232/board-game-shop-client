import { CreateOrderDetails } from "./create-order-details.model";

export class CreateOrder {
    constructor(
        public orderDetails: CreateOrderDetails[],
        public district: string,
        public province: string,
        public ward: string,
        public houseNumber: string,
        public phoneNumber: string,
        public paymentType: PaymentType = PaymentType.Direct,
        public email?: string,
    ) { }
}

export enum PaymentType {
    Cash = 0,
    Momo = 1,
    Paypal = 2,
    VNPay = 3,
    Direct = 4,
}