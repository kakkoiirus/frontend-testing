import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private content: any[] = [];
  private tvChannels: any[] = [];

  private usersUrl = 'https://reqres.in/api/users';

  private getFavoriteChannels(user: any, content: any, tvChannels: any) {
    const favoriteContentIdList = user.favorite_content_id;

    const favoriteChannelsCounter = favoriteContentIdList.reduce((acc: any, id: number) => {
      const contentElement = content.find((element: any) => element.favorite_content_id === id);

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
        const { name } = tvChannels.find((channel: any) => channel.channel_id === Number(channelId));

        return { id: channelId, name, count: favoriteChannelsCounter[channelId] };
      })
      .sort((a, b) => b.count - a.count);
  }

  constructor(
    private httpClient: HttpClient
  ) {}

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/users.json');
  }

  getContent(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/content.json');
  }

  getTvChannels(): Observable<any[]> {
    return this.httpClient.get<any[]>('/assets/tv_channels.json');
  }

  getData(): Observable<any> {
    return forkJoin([this.getUsers(), this.getContent(), this.getTvChannels()])
      .pipe(
        map(([users, content, tvChannels]: [any, any, any]) => {
        const preparedUsers = users
            .map((user: any) => {
              const favoriteChannel = this.getFavoriteChannels(user, content, tvChannels)
                .map((channel) => channel.name)
                .join(', ');

              return { ...user, favoriteChannel }
            });
        return { users: preparedUsers, content, tvChannels };
      }))
  }

  addUser(user: any, content: any, tvChannels: any): Observable<any> {
    return this.httpClient.post<any>(this.usersUrl, user)
      .pipe(
        map((user) => {
          const favoriteChannel = this.getFavoriteChannels(user, content, tvChannels)
            .map((channel) => channel.name)
            .join(', ');
            
          return { ...user, favoriteChannel }
        })
      )
  }
}
