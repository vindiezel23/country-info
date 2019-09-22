import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryInfoService {

  private _countryInfo =  new Subject<any>();
  public countryInfo = this._countryInfo.asObservable();
  private _searchHistory = new Subject<any>();
  public searchHistory$ = this._searchHistory.asObservable();

  constructor() { }

  getCountryInfo(country: any) {
    this._countryInfo.next(country);
    this.getSearchHistory(country);
  }

  getSearchHistory(country: any) {
    this._searchHistory.next(country);
  }
}
