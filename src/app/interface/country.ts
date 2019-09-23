export interface Country {
  alpha3Code: string;
  flag: string;
  name: string;
  currencies: Currency[];
  latlng: number[];
  area: number;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}