import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppUtils } from 'src/app/utils/app.utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  numberOfCartLine: number = 0;
  constructor(private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.localStorageService.localStorage.subscribe(() => {
      this.setNumberOfCartLine();
    });
  }

  setNumberOfCartLine() {
    let cartString = localStorage.getItem("cart");
    if(!cartString || cartString == "{}")
      return;
    let productMap: Map<string, number> = JSON.parse(cartString, AppUtils.mapReviver);
    this.numberOfCartLine = productMap.size; 
  }

  moveToCart() {
    this.router.navigate(['cart'], {
      relativeTo: this.route,
    })
  }
}