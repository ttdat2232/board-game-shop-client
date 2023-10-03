import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressService } from 'src/app/core/services/address.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { District, Division, Ward } from 'src/app/core/models/address.model';
import { ButtonComponent } from "../../button/button.component";

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
})
export class CheckoutComponent implements OnInit {
  divisions!: Division[];
  districts!: District[];
  wards!: Ward[];
  form: FormGroup = new FormGroup('');
  constructor(private addressService: AddressService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressService.getAllDivisions()
      // .subscribe({
      //   next: data => this.divisions = data,
      // });
    this.form = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+84|0)\d{9}$/)]],
      province: ['', [Validators.required]],
      district: ['', Validators.required],
      ward: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]]
    })
  }

  onProviceChange(event: any) {
    let value = event.target.value as string;
    let codeAndName = value.split(',');
    this.form.value.province = codeAndName[1];
    this.addressService.getDivisionById(Number.parseInt(codeAndName[0]))
      .subscribe({
        next: data => this.districts = data.districts
      })
  }

  onDistrictChange(event: any) {
    let value = event.target.value as string;
    let codeAndName = value.split(',');
    this.form.value.district = codeAndName[1];
    this.addressService.getDistrictById(Number.parseInt(codeAndName[0]))
      .subscribe({
        next: data => this.wards = data.wards,
      });
    console.log(this.form.value);
  }
}
