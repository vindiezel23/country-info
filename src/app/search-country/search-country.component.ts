import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    debounceTime,
    tap,
    switchMap,
    finalize,
    distinctUntilChanged,
    filter,
    startWith, 
    catchError,
    defaultIfEmpty
} from 'rxjs/operators';
@Component({
  selector: 'search-country',
  templateUrl: './search-country.component.html',
  styleUrls: ['./search-country.component.scss']
})
export class SearchCountryComponent implements OnInit {
  searchCountriesCtrl = new FormControl();
  filteredCountries: any;
  isLoading = false;
  errorMsg: string;
 
  constructor(
    private http: HttpClient
  ) { }
 
    ngOnInit() {
    this.searchCountriesCtrl.valueChanges
        .pipe(
          startWith(''),
          debounceTime(500),
          distinctUntilChanged(),
          tap(() => {
            this.errorMsg = "";
            this.filteredCountries = [];
            this.isLoading = true;
        }),
        switchMap(value => value.length < 3 ? of([]) : this.http.get(`https://restcountries.eu/rest/v2/name/${value}`)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
            catchError(err => this.filteredCountries = [])
          )
        )
    ).subscribe(data => {
        this.filteredCountries = data;
        this.isLoading = false;
      });
  }
}