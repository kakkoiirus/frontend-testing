import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = []; // TODO: выделить модель данных
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  ngOnInit() {
    this.httpClient.get<any[]>('/assets/users.json').subscribe((users: any[]) => {
      this.users = users;
    });

    // this.httpClient.post('https://reqres.in/api/users', { name: 'Ivan', favorite_content_id: [ 1, 2, 3] }).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
