import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { ICity } from '../../city';
import { ICategory } from '../../category';
import { IExperty } from '../../experty';
import { BehaviorSubject } from 'rxjs';
import { IFilter } from '../../filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() searchClicked: EventEmitter<IFilter> = new EventEmitter<IFilter>();

  filterForm = new FormGroup({
    selectedCity: new FormControl(),
    selectedCategory: new FormControl(),
    selectedExperty: new FormControl()
  });

  groupedCities: SelectItemGroup[] = [];
  groupedCategories: SelectItemGroup[] = [];
  groupedExperties: SelectItemGroup[] = [];

  // initialize a private variable cities, it's a BehaviorSubject
  private _cities = new BehaviorSubject<ICity[]>([]);
  // change data to use getter and setter
  @Input()
  set cities(value) {
    // set the latest value for _cities BehaviorSubject
    this._cities.next(value);
  }
  get cities() {
    // get the latest value from _cities BehaviorSubject
    return this._cities.getValue();
  }

  private _categories = new BehaviorSubject<ICategory[]>([]);
  @Input()
  set categories(value) {
    this._categories.next(value);
  }
  get categories() {
    return this._categories.getValue();
  }

  experties: IExperty[];

  ngOnInit() {
    // now we can subscribe to it, whenever input changes, we will run our grouping logic
    this._cities.subscribe(data => {
      if (this.cities) {
        const grouped = this.groupBy(this.cities, city => city.type);
        grouped.forEach(element => {
          this.groupedCities.push({ 'label': element[0].type, items: [] });
          element.forEach(city => {
            const selectedGroup = this.groupedCities.find(x => x.label === city.type);
            if (selectedGroup) {
              selectedGroup.items.push({ label: city.name, value: city.name });
            }
          });
        });
      }
    });

    this._categories.subscribe(data => {
      if (this.categories) {
        const grouped = this.groupBy(this.categories, category => category.type);
        grouped.forEach(element => {
          this.groupedCategories.push({ 'label': element[0].type, items: [] });
          element.forEach(category => {
            const selectedGroup = this.groupedCategories.find(x => x.label === category.type);
            if (selectedGroup) {
              selectedGroup.items.push({ label: category.name, value: category.name });
            }
          });
        });
      }
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.filterForm.value);
    const filter: IFilter = new IFilter;
    filter.city = this.filterForm.value.selectedCity ? this.filterForm.value.selectedCity : '';
    filter.category = this.filterForm.value.selectedCategory ? this.filterForm.value.selectedCategory : '';
    filter.experties = this.filterForm.value.selectedExperty ? this.filterForm.value.selectedExperty : '';
    this.searchClicked.emit(filter);

  }

  onCategorySelection(): void {
    const selectedCategoryName = this.filterForm.value.selectedCategory;
    if (selectedCategoryName) {
      const categorySelected = this.categories.find(category => category.name === selectedCategoryName);
      if (categorySelected && categorySelected.experties) {
        this.experties = categorySelected.experties;
        const grouped = this.groupBy(this.experties, experty => experty.type);
        grouped.forEach(element => {
          this.groupedExperties.push({ 'label': element[0].type, items: [] });
          element.forEach(experty => {
            const selectedGroup = this.groupedExperties.find(x => x.label === experty.type);
            if (selectedGroup) {
              selectedGroup.items.push({ label: experty.name, value: experty.name });
            }
          });
        });
      }
    } else {
      // clear the array for experties
      this.groupedExperties = [];
    }
  }

  groupBy(list, keyGetter): any {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
}
