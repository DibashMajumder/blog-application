import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public allBlogs;
  public currentBlog;
  public blogData;
  public baseURL:string = 'https://blogapp.edwisor.com/api/v1';
  public myAuthToken = 'ODQ2ZjA4MmJmYzAxZmQ3YjNiMjYyNjNiMjgxZWMyZjMwZDJlZmM1Nzk4OTk3NmVkN2UyYzBhMjAxMDY4NzJmZWEzMGY4OGM2Y2FmMDg3YjgyNjVmM2I3MTcxZTBhZDczYWI0ZDFmMzhkZTQ5OWM2NGI3NGMxYjhiODU0MjI3ZmE2Ng==';

  constructor(private _http:HttpClient) {
    console.log('Blog Http service is called');
  }

  private handleError(err: HttpErrorResponse){
    console.log('Some error occured');
    console.log(err.message);
    return Observable.throw(err.message);
  }

  public getAllBlogs(): any {
    let myResponse = this._http.get(
      this.baseURL + '/blogs/all' + '?authToken=' + this.myAuthToken
    );
    console.log(myResponse);
    return myResponse;
  }

  public getSingleBlogDetails(currentBlog): any {
    let myResponse = this._http.get(
      this.baseURL + '/blogs/view/' + currentBlog + '?authToken=' + this.myAuthToken
    );
    console.log(myResponse);
    return myResponse;
  }

  public createBlog(blogData): any {
    let myResponse = this._http.post(this.baseURL + '/blogs/create' + '?authToken=' + this.myAuthToken, blogData);
    return myResponse;
  }

  public deleteBlog(blogId): any {
    let data = {};
    let myResponse = this._http.post(this.baseURL + '/blogs/' + blogId + '/delete' + '?authToken=' + this.myAuthToken, data);
    return myResponse;
  }

  public editBlog(blogId, blogData): any {
    let myResponse = this._http.put(this.baseURL + '/blogs/' + blogId + '/edit' + '?authToken=' + this.myAuthToken, blogData);
    return myResponse;
  }
}
