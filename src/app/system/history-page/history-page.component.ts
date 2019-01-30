import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Subscription} from 'rxjs';
import {BKEvent} from '../shared/models/event.model';
import {Category} from '../shared/models/category.model';

@Component({
  selector: 'bk-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.sass']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService, private eventService: EventService) { }
  sub$: Subscription;
  categories: Category[];
  events: BKEvent[];
  chartData = [];
  isLoaded = false;

  ngOnInit() {
    this.sub$ = combineLatest(
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ).subscribe((data: [Category[], BKEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }
  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((c) => {
      const cEvent = this.events.filter((e) => e.category === c.id && e.type === 'outcome');
      this.chartData.push({
        name: c.name,
        value: cEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }
  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

}
