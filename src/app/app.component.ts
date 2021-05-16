import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: any[] = []; // TODO: выделить модель данных
  content: any[] = [];
  tvChannels: any[] = [];

  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private getFavoriteChannels(user: any) {
    const favoriteContentIdList = user.favorite_content_id;

    const favoriteChannelsCounter = favoriteContentIdList.reduce((acc: any, id: number) => {
      const contentElement = this.content.find((element) => element.favorite_content_id === id);

      if (!contentElement) {
        return;
      }

      const favoriteChannelId = contentElement.channel_id;

      if (!acc[favoriteChannelId]) {
        acc[favoriteChannelId] = 0;
      }

      acc[favoriteChannelId] += 1;

      return acc;
    }, {});

    return Object.keys(favoriteChannelsCounter)
      .map((channelId) => {
        const { name } = this.tvChannels.find((channel) => channel.channel_id === Number(channelId));

        return { id: channelId, name, count: favoriteChannelsCounter[channelId] };
      })
      .sort((a, b) => b.count - a.count);
  }

  ngOnInit() {
    const getUsers = this.httpClient.get<any[]>('/assets/users.json');
    const getContent = this.httpClient.get<any[]>('/assets/content.json');
    const getTvChannels = this.httpClient.get<any[]>('/assets/tv_channels.json');
    
    forkJoin([getUsers, getContent, getTvChannels])
      .subscribe(([users, content, tvChannels]) => {
        this.content = content;
        this.tvChannels = tvChannels;

        this.users = users
            .map((user) => {
              const favoriteChannel = this.getFavoriteChannels(user)
                .map((channel) => channel.name)
                .join(', ');

                return { ...user, favoriteChannel }
            });
      });

    // this.httpClient.post('https://reqres.in/api/users', { name: 'Ivan', favorite_content_id: [ 1, 2, 3] }).subscribe((data) => {
    //   console.log(data);
    // });
  }
}
