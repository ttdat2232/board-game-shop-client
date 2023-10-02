import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field'
import { ProductStatus, SearchProduct } from 'src/app/core/models/product.search';
import { CategoryService } from 'src/app/core/services/category.service';
import { PagingResult } from 'src/app/core/models/paging-result';
import { Category } from 'src/app/core/models/category';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() searchProduct!: SearchProduct;
  searchForm!: FormGroup;
  prodcutStatuses: string[] = Object.keys(ProductStatus).filter(key => Number.isNaN(Number.parseInt(key)));
  categories!: Observable<Category[]>;
  constructor(private fb: FormBuilder, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories()
      .pipe(map(data => data.values));
    this.searchForm = this.fb.group({
      name: [],
      orderBy: this.fb.array([]),
      statuses: this.fb.array([]),
      minPrice: [0],
      maxPrice: [0],
      categories: this.fb.array([])
    });
  }

  private getStatusesArray() {
    return this.searchForm.get('statuses') as FormArray;
  }

  private getCategoriesArray() {
   return this.searchForm.get('categories') as FormArray; 
  }

  onStatusChange(event: any) {
    if (event.target.checked) {
      this.getStatusesArray().push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      this.getStatusesArray().controls.forEach(ctrl => {
        if(ProductStatus[ctrl.value] === ProductStatus[event.target.value]) {
          this.getStatusesArray().removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onCategoriesChange(event: any) {
    if(event.target.checked) {
      this.getCategoriesArray().push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      this.getCategoriesArray().controls.forEach(ctrl => {
        if(ctrl.value == event.target.value) {
          this.getCategoriesArray().removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  private timeOut: any;
  formChange() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(() => {
      console.log(this.searchForm);
    }, 500);
  }
}
