import {Component, Input, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';

import {Category} from '../../shared/models/category.model';
import {BKEvent} from '../../shared/models/event.model';
import * as moment from 'moment';
import {EventService} from '../../shared/services/event.service';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {mergeMap} from 'rxjs/operators';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bk-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.sass']
})
export class AddEventComponent implements OnDestroy {
  @Input() categories: Category[] = [];

  subs1$: Subscription;
  subs2$: Subscription;

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  constructor(private eventService: EventService, private billService: BillService) {
  }

  message: Message = new Message('danger', '');
  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
}

  onSubmit(form: NgForm) {
    let {amount, description, category, type} = form.value;
    if (amount < 1) {
      amount *= -1;
    }

    const event = new BKEvent(
      type, amount, +category, description,
      moment().format('DD.MM.YYYY HH:mm:ss'));
    this.subs1$ = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`Not enough money. You still need ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }
        this.subs2$ = this.billService.updateBill({value, currency: bill.currency})
          .pipe(
            mergeMap(() => this.eventService.addEvent(event))
          )
          .subscribe(() => {
              form.setValue({
                amount: 0,
                description: ' ',
                category: 1,
                type: 'outcome'
              });
          });
      });
  }

  ngOnDestroy(): void {
    if (this.subs1$) { this.subs1$.unsubscribe(); }
    if (this.subs2$) { this.subs2$.unsubscribe(); }
  }
}
