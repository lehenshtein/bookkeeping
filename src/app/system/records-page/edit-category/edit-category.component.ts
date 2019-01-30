import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Message} from '../../../shared/models/message.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bk-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message = new Message('success', '');

  constructor(private categoriesService: CategoriesService) { }

  subs1$: Subscription;


  ngOnInit(): void {
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find((cat) => {
      return cat.id === +this.currentCategoryId;
    });
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 1) { capacity *= -1; }

    const category = new Category(name, capacity, +this.currentCategoryId);
    this.categoriesService.updateCategory(category)
      .subscribe((updCategory: Category) => {
        this.onCategoryEdit.emit(updCategory);
        this.message.text = 'Category was edited';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }
  onDelete(categoryId: NgForm) {
    this.subs1$ = this.categoriesService.deleteCategory(categoryId.value)
      .subscribe(() => {
        const idx = this.categories.findIndex((c) => c.id === +categoryId.value);
        this.categories.splice(idx, 1);
        this.message.text = 'Category was deleted';
        window.setTimeout(() => this.message.text = '', 5000);
       });
  }

  ngOnDestroy(): void {
    if (this.subs1$) {this.subs1$.unsubscribe(); }
  }
}
