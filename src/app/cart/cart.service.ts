import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { untilDestroyed } from '@app/@core';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/auth/authentication.service';
import { GlobalErrorService } from '@core/services/global-error.service';
import { MatDialogWrapperComponent } from '@shared/mat-dialog-wrapper/mat-dialog-wrapper.component';

import { ProductModel } from '@core/model/product.model';
import { ApiResponseModel } from '@core/model/api-response.model';

@Injectable({ providedIn: 'root' })
export class CartService implements OnDestroy {
  private _cartItems: ProductModel[] = [];
  private _isLoggedIn: boolean;
  private _matDialogConfig: MatDialogConfig = {
    minWidth: '250px',
    minHeight: '200px',
  };

  constructor(
    private _authenticationService: AuthenticationService,
    private _matDialog: MatDialog,
    private _router: Router,
    private _http: HttpClient,
    private _globalErrorService: GlobalErrorService
  ) {
    this._loginFlagHandler();
  }

  ngOnDestroy() {}

  /**
   * TODO:
   * 1. Check whether user is logged in or not?
   * 2. If not, ask user to login.
   * 3. If logged in, add the product inside the cart
   * 4. Logic to check whether user has already added the product.
   * // const dialogConfig = this._matDialogConfig;
   * // dialogConfig.data = { header: 'Success!', content: 'Product added successfully.' };
   * // this._matDialog.open(MatDialogWrapperComponent, dialogConfig);
   */
  isCartAccessible(product: ProductModel) {
    if (!this._isLoggedIn) {
      this._router.navigate(['/login'], { queryParams: { redirect: `products/${product.id}` }, replaceUrl: true });
      return false;
    }
    return true;
  }

  addToCart(product: ProductModel): Observable<ApiResponseModel> {
    return this._http
      .post<ApiResponseModel>(
        this._getCartUrl(),
        { itemId: product.id, itemQuantity: product.limit },
        { headers: this._getAuthorizationHeader() }
      )
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  isProductAvailableInCart(productId: number): Observable<ApiResponseModel> {
    return this._http
      .get<ApiResponseModel>(`${this._getCartUrl()}/${productId}`, { headers: this._getAuthorizationHeader() })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  getCartProducts(): Observable<ApiResponseModel> {
    return this._http
      .get<ApiResponseModel>(this._getCartUrl(), { headers: this._getAuthorizationHeader() })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  deleteProductFromCart(productId: number): Observable<ApiResponseModel> {
    return this._http
      .delete<ApiResponseModel>(`${this._getCartUrl()}/${productId}`, { headers: this._getAuthorizationHeader() })
      .pipe(catchError(this._globalErrorService.handleHttepResponseError));
  }

  private _loginFlagHandler() {
    this._authenticationService.isLoggedIn.pipe(untilDestroyed(this)).subscribe((val) => {
      this._isLoggedIn = val;
    });
  }

  private _getCartUrl() {
    return `${environment.serverUrl}cart`;
  }

  private _getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYW5uZXJJZCI6IkIwMDg1MzkxMyIsInJvbGVJZCI6MywiaWF0IjoxNTk1NjQ5OTYxLCJleHAiOjE1OTU2NTM1NjF9.01dqa7QNqEn1veB8ruqfKgfcXOcpIigQCo4RcA_xp14',
    });
  }
}
