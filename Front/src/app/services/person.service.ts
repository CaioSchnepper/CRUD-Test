import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../domain/person';

const ApiRoot = 'http://localhost:8080/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(ApiRoot);
  }

  get(id: any): Observable<Person> {
    return this.http.get(`${ApiRoot}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(ApiRoot, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${ApiRoot}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${ApiRoot}/${id}`);
  }

}
