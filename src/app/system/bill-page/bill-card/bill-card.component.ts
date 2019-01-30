import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'bk-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.sass']
})
export class BillCardComponent implements OnInit {
  @Input() billIn: Bill;
  @Input() currencyIn: any;

  dollar: Object;
  euro: Object;
  rub: Object;
  btc: Object;
  dollarSale: number;
  euroSale: number;
  rubSale: number;
  btcSale: number;

  constructor() { }

  ngOnInit() {
    this.dollar = this.getCurrency('USD')[0];
    this.euro = this.getCurrency('EUR')[0];
    this.rub = this.getCurrency('RUR')[0];
    this.btc = this.getCurrency('BTC')[0];

    this.dollarSale = this.billIn.value / this.dollar['sale'];
    this.euroSale = this.billIn.value / this.euro['sale'];
    this.rubSale = this.billIn.value / this.rub['sale'];
    this.btcSale = this.billIn.value / this.btc['sale'];
  }
  getCurrency(cur: string) {
    return this.currencyIn.filter((item) => {
      return item['ccy'] === cur;
    });
  }
}
