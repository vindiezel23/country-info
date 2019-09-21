import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatLabel } from '@angular/material';
//import { MatAutocomplete, MatInput, MatFormField, MatFormFieldControl, MatPlaceholder } from '@angular/material';
import { Observable, of } from 'rxjs';
import {
    debounceTime,
    tap,
    switchMap,
    finalize,
    distinctUntilChanged,
    filter,
    startWith, 
    catchError
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
          filter(query => query.length >= 3),
          distinctUntilChanged(),
          catchError(err => of([])),
          tap(() => {
            this.errorMsg = "";
            this.filteredCountries = [];
            this.isLoading = true;
        }),
        switchMap(value => this.http.get(`https://restcountries.eu/rest/v2/name/${value}`)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
    ).subscribe(data => {
        this.filteredCountries = data;
        this.isLoading = false;
         console.log(data);
      });
  }
}