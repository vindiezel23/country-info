import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryInfoService } from '../country-info.service';
import { MatTableDataSource } from '@angular/material';
import { SearchHistory } from '../interface/search-history';

@Component({
  selector: 'search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {
  displayedColumns: string[] = ['flag', 'name', 'currencies', 'latlng', 'area', 'lastsearched'];
  dataSource =  new MatTableDataSource<SearchHistory>();
  searchHistory$: Subscription;
  constructor(private countryInfoService: CountryInfoService) { }

  ngOnInit() {
    this.searchHistory$ = this.countryInfoService.searchHistory.subscribe(value => {
      this.dataSource.data = value;
    });
  }

  ngOnDestroy() {
    if(this.searchHistory$) {
      this.searchHistory$.unsubscribe();
    }
  }

}
