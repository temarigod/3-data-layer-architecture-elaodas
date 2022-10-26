import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DogFromApi } from '../interfaces/dog-from-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DogsApiService {
  constructor(private readonly httpClient: HttpClient) {}

  public getDogs$(): Observable<DogFromApi[]> {
    return this.httpClient.get<DogFromApi[]>('http://localhost:3000/dogs');
  }
}
