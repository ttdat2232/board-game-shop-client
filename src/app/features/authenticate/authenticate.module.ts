import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticateRoutingModule } from './authenticate-routing.module';
import { AuthenticateComponent } from './authenticate.component';
import { LoginComponent } from "./login/login.component";
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';


@NgModule({
    declarations: [
        AuthenticateComponent
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider("866231025685-qr5pl0iaic9bqaathj6u3lg8poim7dk3.apps.googleusercontent.com")
                    }
                ] 
            } as SocialAuthServiceConfig,
        }
    ],
    imports: [
        CommonModule,
        AuthenticateRoutingModule,
        LoginComponent,
        SocialLoginModule,
        SpinnerComponent
    ]
})
export class AuthenticateModule { }
