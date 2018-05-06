import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item: Item = {
    title: '',
    description: ''
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.item.title != '' && this.item.description != '') {
      this.dataService.addItem(this.item);
      this.item.title = '';
      this.item.description = '';
    }
  }

}
