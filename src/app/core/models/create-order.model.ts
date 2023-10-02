import { CreateOrderDetails } from "./create-order-details.model";

export class CreateOrder {
    constructor(
        public orderDetails: CreateOrderDetails[],
        public city: string,
        public province: string,
        public street: string,
        public houseNumber: string,
        public phoneNumber: string,
    ) {}
}

export enum PaymentType {
    Cash, Momo, Paypal, VNPay, Direct
}