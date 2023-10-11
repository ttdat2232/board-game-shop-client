import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressService } from 'src/app/core/services/address.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { District, Division, Ward } from 'src/app/core/models/address.model';
import { ButtonComponent } from "../../button/button.component";
import { AppUtils } from 'src/app/utils/app.utils';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrder, PaymentType } from 'src/app/core/models/create-order.model';
import { CreateOrderDetails } from 'src/app/core/models/create-order-details.model';
import { OrderService } from 'src/app/core/services/order.service';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '../../dialog/dialog.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, SpinnerComponent]
})

export class CheckoutComponent implements OnInit {
  formGroupClass: string = "form-group col-6";
  divisions?: Division[];
  districts?: District[];
  wards?: Ward[];
  selectProducts!: Map<string, number>;
  form: FormGroup = new FormGroup('');
  qrUrl?: string;
  isSubmited: boolean = false;
  isDone: boolean = false;
  isAgreePolicy: boolean = false;
  constructor(
    private dialog: MatDialog,
    private addressService: AddressService,
    private lss: LocalStorageService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.addressService.getAllDivisions()
      .subscribe({
        next: data => this.divisions = data,
      });
    this.form = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+84|0)\d{9}$/)]],
      province: ['', [Validators.required]],
      district: ['', Validators.required],
      ward: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
      email: ['', [Validators.email]]
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: new DialogData("Lưu ý", "nội dung", "Đồng ý", "Hủy"),
      width: '80%',
    });
    dialogRef.afterClosed().subscribe(result => this.isAgreePolicy = result);
  }

  onProviceChange(event: any) {
    let value = event.target.value as string;
    let codeAndName = value.split(',');
    this.form.value.province = codeAndName[1];
    this.addressService.getDivisionById(Number.parseInt(codeAndName[0]))
      .subscribe({
        next: data => this.districts = data.districts
      });
  }

  onDistrictChange(event: any) {
    let value = event.target.value as string;
    let codeAndName = value.split(',');
    this.form.value.district = codeAndName[1];
    this.addressService.getDistrictById(Number.parseInt(codeAndName[0]))
      .subscribe({
        next: data => this.wards = data.wards,
      });
  }

  createOrder(event: boolean) {
    if (!this.isAgreePolicy) {
      this.openDialog();
    } else {
      this.isSubmited = event;
      this.isDone = true;
      this.selectProducts = AppUtils.getCart();
      let orderDetails: CreateOrderDetails[] = [];
      this.selectProducts.forEach((value: number, key: string, map: Map<string, number>) => {
        orderDetails.push(new CreateOrderDetails(key, value));
      });
      let district = this.form.value.district.split(',')[1] as string;
      let province = this.form.value.province.split(',')[1] as string;
      let email = (this.form.value.email as string).length > 0 ? this.form.value.email as string : undefined;
      let order = new CreateOrder(
        orderDetails,
        district,
        province,
        this.form.value.ward,
        this.form.value.houseNumber,
        this.form.value.phoneNumber,
        PaymentType.Direct,
        email
      );
      this.orderService.createOrder(order)
        .subscribe({
          next: data => {
            this.qrUrl = `https://img.vietqr.io/image/970436-1016258339-compact2.jpg?amount=${data.totalPrice}&addInfo=Ma Don hang: ${data.id}`;
            this.lss.removeItem('cart');
            this.isSubmited = false;
          },
          error: err => {
            this.isSubmited = false;
            console.log(err);
          }
        });
    }
  }
}
