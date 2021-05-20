import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
