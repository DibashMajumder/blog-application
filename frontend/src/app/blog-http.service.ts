import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { authToken } from './authToken';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public allBlogs;
  public currentBlog;
  public blogData;
  public baseURL = 'http://localhost:3000/api/v1';
  public myAuthToken = authToken ;

  constructor(private _http: HttpClient) {
    console.log('Blog Http service is called');
  }

  private handleError(err: HttpErrorResponse) {
    console.log('Some error occured');
    console.log(err.message);
    return Observable.throw(err.message);
  }

  public getAllBlogs(): any {
    const myResponse = this._http.get(
      this.baseURL + '/blogs/all'
    );
    console.log(myResponse);
    return myResponse;
  }

  public getSingleBlogDetails(currentBlog): any {
    const myResponse = this._http.get(
      this.baseURL + '/blogs/view/' + currentBlog
    );
    console.log(myResponse);
    return myResponse;
  }

  public createBlog(blogData): any {
    const myResponse = this._http.post(this.baseURL + '/blogs/create', blogData);
    return myResponse;
  }

  public deleteBlog(blogId): any {
    const data = {};
    const myResponse = this._http.post(this.baseURL + '/blogs/' + blogId + '/delete', data);
    return myResponse;
  }

  public editBlog(blogId, blogData): any {
    const myResponse = this._http.put(this.baseURL + '/blogs/' + blogId + '/edit', blogData);
    return myResponse;
  }
}

// + '?authToken=' + this.myAuthToken
