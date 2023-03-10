import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../interfaces';

import { map } from 'rxjs/operators'

const apiKey = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient ) { }

  getTopHeadlines():Observable<Article[]>{
    return this.http.get<NewsResponse>('https://newsapi.org/v2/everything', {
      params: {
        apiKey,
        sources: 'el-mundo',
        sortBy:'publishedAt',
        from:'2022-11-23'
      }
    }).pipe(
      map( ({ articles }) => articles )
    );
  
  }
}
