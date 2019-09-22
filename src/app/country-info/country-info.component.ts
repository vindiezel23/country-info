import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryInfoService } from '../country-info.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['flag', 'name', 'currencies', 'latlng', 'area'];
  dataSource =  new MatTableDataSource<any>();
  countryInfo$: Subscription;
  constructor(private countryInfoService: CountryInfoService) { }

  ngOnInit() {
    this.countryInfo$ = this.countryInfoService.countryInfo.subscribe(value => {
      this.dataSource.data = [value];
      console.log(this.dataSource.data);
    });
  }

  ngOnDestroy() {
    if(this.countryInfo$) {
      this.countryInfo$.unsubscribe();
    }
  }

}
