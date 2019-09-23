import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Country } from './interface/country';
import { SearchHistory } from './interface/search-history';
import * as _ from 'lodash';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CountryInfoService {
  LOCAL_STORAGE_KEY:string = 'country-info-search-history';
  private _countryInfo$ =  new Subject<Country>();
  public countryInfo = this._countryInfo$.asObservable();
  searchHistoryRecords: SearchHistory[] = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)) || [];
  private _searchHistory$ = new BehaviorSubject<SearchHistory[]>(this.searchHistoryRecords);
  public searchHistory: Observable<SearchHistory[]> = this._searchHistory$.asObservable();
  

  constructor() { }

    getCountryInfo(country:Country) {
      this._countryInfo$.next(country);
      this.saveSearchHistory(country);
    }

    getSaveHistory() {
        return this.searchHistoryRecords;
    }

    saveSearchHistory(country:Country) {
        let dte = moment().format('DD-MM-YYYY H:mm:ss');
        let record: SearchHistory = {
            country: country,
            lastSearch: dte
        };
        let filteredArr = _.filter(this.searchHistoryRecords, function (o) {
            return o.country && o.country.alpha3Code != country.alpha3Code;
        });
        this.searchHistoryRecords = _.concat([record], filteredArr);
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.searchHistoryRecords));
        this._searchHistory$.next(this.searchHistoryRecords);
  }
}
