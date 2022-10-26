import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDataFromApi } from '../interfaces/profile-data-from-api.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public getProfileData$(): Observable<ProfileDataFromApi> {
    return this.httpClient.get<ProfileDataFromApi>(
      'http://localhost:3000/profile-data'
    );
  }

  public setDogFavorite$(dogId: string, favorite: boolean): Observable<void> {
    return this.httpClient.put<any>('http://localhost:3000/set-favorite', {});
  }
}
