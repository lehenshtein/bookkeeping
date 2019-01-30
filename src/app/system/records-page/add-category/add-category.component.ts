import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bk-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnDestroy {

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  subs1$: Subscription;

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 1) { capacity *= -1; }

    const sendingCategory = new Category(name, capacity);
    this.subs1$ = this.categoriesService.addCategory(sendingCategory)
      .subscribe((category: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.onCategoryAdd.emit(category);
      });
  }

  ngOnDestroy(): void {
    if (this.subs1$) { this.subs1$.unsubscribe(); }
  }

}
