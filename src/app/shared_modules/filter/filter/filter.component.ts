import { Component, OnChanges, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { ICity } from '../../city';
import { ICategory } from '../../category';
import { IExperty } from '../../experty';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {

  groupedCities: SelectItemGroup[] = [];
  groupedCategories: SelectItemGroup[] = [];
  groupedExperties: SelectItemGroup[] = [];

  @Input() cities: ICity[];
  @Input() categories: ICategory[];
  experties: IExperty[];

  filterForm = new FormGroup({
    selectedCity: new FormControl(),
    selectedCategory: new FormControl(),
    selectedExperty: new FormControl()
  });

  constructor() {
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.filterForm.value);
  }
  ngOnChanges() {
    if (this.cities) {
      const grouped = this.groupBy(this.cities, city => city.type);
      grouped.forEach(element => {
        this.groupedCities.push({ 'label': element[0].type, items: [] });
        element.forEach(city => {
          const selectedGroup = this.groupedCities.filter(x => x.label === city.type);
          if (selectedGroup && selectedGroup.length > 0) {
            selectedGroup[0].items.push({ label: city.name, value: city.name });
          }
        });
      });
    }

    if (this.categories) {
      const grouped = this.groupBy(this.categories, category => category.type);
      grouped.forEach(element => {
        this.groupedCategories.push({ 'label': element[0].type, items: [] });
        element.forEach(category => {
          const selectedGroup = this.groupedCategories.filter(x => x.label === category.type);
          if (selectedGroup && selectedGroup.length > 0) {
            selectedGroup[0].items.push({ label: category.name, value: category.name });
          }
        });
      });
    }
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
            const selectedGroup = this.groupedExperties.filter(x => x.label === experty.type);
            if (selectedGroup && selectedGroup.length > 0) {
              selectedGroup[0].items.push({ label: experty.name, value: experty.name });
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
