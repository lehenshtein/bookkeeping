import {Component, Input} from '@angular/core';

@Component({
  selector: 'bk-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.sass']
})
export class CurrencyCardComponent {
  @Input() currencyIn: any;
}
