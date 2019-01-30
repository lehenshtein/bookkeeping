import { Component, OnInit } from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'bk-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.sass']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  allCategories: Category[] = [];
  isLoaded = false;

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.allCategories = categories;
        this.isLoaded = true;
      });
  }
  newCategoryAdded(category: Category) {
    this.allCategories.push(category);
  }
  categoryEdited(category: Category) {
    const idx = this.allCategories
      .findIndex(c => c.id === category.id );
    this.allCategories[idx] = category;
  }
}
