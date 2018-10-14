import { Component, OnChanges, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { ICity } from '../../city';
import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnChanges {

  groupedCities: SelectItemGroup[] = [];
  @Input() cities: ICity[];

  filterForm = new FormGroup({
    selectedCity: new FormControl()
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
          const seletedGroup = this.groupedCities.filter(x => x.label === city.type);
          if (seletedGroup && seletedGroup.length > 0) {
            seletedGroup[0].items.push({ label: city.name, value: city.name });
          }
        });
      });
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
