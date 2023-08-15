import { Component, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface formData {
  position: number;
  name: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with filtering
 */
@Component({
  selector: 'table-filtering-example',
  styleUrls: ['table-filtering-example.css'],
  templateUrl: 'table-filtering-example.html',
})
export class TableFilteringExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  readonly formControl: AbstractControl;
  @ViewChild(MatSort) sort: MatSort;

  position = new FormControl();
  name = new FormControl();
  symbol = new FormControl();

  formData: formData = {
    position: this.position.value as number,
    name: this.name.value || ('' as string),
    symbol: this.symbol.value || ('' as string),
  };

  constructor(formBuilder: FormBuilder) {
    this.dataSource.filterPredicate = ((data, filter) => {
      console.log('data', data);
      console.log('filter', filter);
      const a = !filter.position || data.position === filter.position;
      const b = !filter.name || data.name.toLowerCase().includes(filter.name);
      const c = !filter.symbol || data.symbol === filter.symbol;
      return a && b && c;
    }) as (PeriodicElement, string) => boolean;

    this.formControl = formBuilder.group({
      name: '',
      position: '',
      symbol: '',
    });
    this.formControl.valueChanges.subscribe((value) => {
      // console.log('value', value);
      const filter = {
        ...value,
        name: value.name.trim().toLowerCase(),
      } as string;
      // console.log('filter', filter);
      this.dataSource.filter = filter;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  keyupChange(e) {
    console.log('event', e.target.value);
    console.log('formData', this.formData);
    // this.dataSource.filter = `{no: ${this.formData.position}, name: ${this.formData.name}, symbol: ${this.formData.symbol}}`;
    const filter = {
      ...this.formData,
      name: this.formData.name.trim().toLowerCase(),
    } as unknown as string;
    this.dataSource.filter = filter;
  }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
