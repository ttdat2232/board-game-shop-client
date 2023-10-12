import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../shared/button/button.component";
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SpinnerComponent } from "../../../shared/spinner/spinner.component";
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule, ButtonComponent, SpinnerComponent]
})
export class LoginComponent implements OnInit {
    isSubmited = false;
    constructor(
        private socialAuthService: SocialAuthService,
        private authenticationSerive: AuthenticationService,
        private localStorageService: LocalStorageService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        let idToken = localStorage.getItem('id-token');
        if (idToken) {
            this.loginWithGoogle(idToken);
        }
        this.socialAuthService.authState.subscribe(user => {
            this.localStorageService.setItem('id-token', user.idToken);
            this.loginWithGoogle(user.idToken);
        });
    }

    loginWithGoogle(idToken: string) {
        this.isSubmited = true;
        this.authenticationSerive.loginFromGoogle(idToken)
            .subscribe({
                next: data => {
                    if (data.accessToken) {
                        this.localStorageService.setItem('access-token', data.accessToken);
                        this.router.navigate(['home', {
                            relativeTo: this.route
                        }])
                    }
                },
                error: err => {
                    this.isSubmited = false;
                    console.log(err);
                }
            })
    }
}
