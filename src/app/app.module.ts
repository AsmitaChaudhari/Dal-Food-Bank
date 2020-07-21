import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from '@app/material.module';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { AppRoutingModule } from '@app/app-routing.module';

import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/home/home.component';
import { SignUpComponent } from '@app/signup/signup.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { ForgotPasswordComponent } from '@app/forgot-password/forgot-password.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NewOrderCheckoutComponent } from './new-order-checkout/new-order-checkout.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    CoreModule,
    SharedModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
    MatSortModule,
    MatTableModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    CheckoutComponent,
    NewOrderCheckoutComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
