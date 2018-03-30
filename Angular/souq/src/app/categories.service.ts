import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable()
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories():Observable<any> {

      return this.http.get<any>(`https://localhost:9090/categories/list`);
    }
    getsubCategory(name):Observable<any> {

        return this.http.get<any>(`https://localhost:9090/categories/sub/${name}`);
      }
}
