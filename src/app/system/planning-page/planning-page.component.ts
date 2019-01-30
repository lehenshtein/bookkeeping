import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Subscription} from 'rxjs';
import {Bill} from '../shared/models/bill.model';
import {BKEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'bk-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.sass']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: BKEvent[] = [];

  private sub1$: Subscription;

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventService
    ) { }

  ngOnInit() {
    this.sub1$ = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], BKEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }
  private getPercent(cat: Category): number {
    const percent = ((100 * this.getCategoryCost(cat)) / cat.capacity);
    return percent > 100 ? 100 : percent;
  }
  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }
  ngOnDestroy(): void {
    if (this.sub1$) {
      this.sub1$.unsubscribe();
    }
  }
}
