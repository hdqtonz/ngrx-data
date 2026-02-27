import { Injectable } from '@angular/core';
import { DefaultDataService, HttpOptions, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({ providedIn: 'root' })
export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }

  override add(post: Post): Observable<Post> {
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
  }

  override getById(key: number | string, options?: HttpOptions): Observable<Post> {
    return this.http.get<Post>(`https://jsonplaceholder.typicode.com/posts/${key}`);
  }

  override update(update: Update<Post>): Observable<Post> {
    const { id, changes } = update;
    return this.http.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, changes);
  }

  override delete(id: number): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }
}
