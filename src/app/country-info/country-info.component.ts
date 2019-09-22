import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryInfoService } from '../country-info.service';

@Component({
  selector: 'country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit, OnDestroy {
  countryInfo$: Subscription;
  constructor(private countryInfoService: CountryInfoService) { }

  ngOnInit() {
    this.countryInfo$ = this.countryInfoService.countryInfo.subscribe(value => {
    });
  }

  ngOnDestroy() {
    if(this.countryInfo$) {
      this.countryInfo$.unsubscribe();
    }
  }

}
