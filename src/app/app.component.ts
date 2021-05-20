import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: {} = {}; // TODO: выделить модель данных

  constructor(
    private dataDervice: DataService
  ) {}

  ngOnInit() {
    this.dataDervice.getData().subscribe((data) => {
      this.data = data;
    })

    // this.httpClient.post('https://reqres.in/api/users', { name: 'Ivan', favorite_content_id: [ 1, 2, 3] }).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
