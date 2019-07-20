import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogHttpService } from '../blog-http.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  public currentBlog;

  constructor(private _route: ActivatedRoute, private router: Router, private blogHttpService: BlogHttpService, private toastr: ToastrService, private location: Location) {
    console.log('Blog View Constructor is called');
  }

  ngOnInit() {
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    this.currentBlog = this.blogHttpService.getSingleBlogDetails(myBlogId).subscribe(
      data =>{
        console.log('Logging data');
        console.log(data);
        this.currentBlog = data['data'];
      },
      error =>{
        console.log('Some error occured');
        console.log(error.errorMessage);
      }
    );

  }

  public deleteThisBlog(): any {
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data =>{
        console.log(data);
        this.toastr.success('Blog deleted successfully', 'Suucess!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error =>{
        console.log('Some error occured');
        console.log(error.errorMessage);
        this.toastr.error('Some error occured','Error');
      }
    )
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }

}
