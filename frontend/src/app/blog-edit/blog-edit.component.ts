import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogHttpService } from '../blog-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  public currentBlog;
  public possibleCategories = ['Comedy', 'Action', 'Drama', 'Technology'];

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private blogHttpService: BlogHttpService,
    private toastr: ToastrService
  ) {
    console.log('Blog edit constructor is called');
  }

  ngOnInit() {
    console.log('Blog Edit ngOnInit is called');

    // tslint:disable-next-line:prefer-const
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.blogHttpService.getSingleBlogDetails(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data['data'];
        console.log('Current blog is ');
        console.log(this.currentBlog);
      },
      error => {
        console.log('Some error occured');
        console.log(error.errorMessage);
      }
    );
  }

  public editThisBlog(): any {
    this.blogHttpService
      .editBlog(this.currentBlog.blogId, this.currentBlog)
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('Blog edited successfully', 'Success!');
          setTimeout(() => {
            this.router.navigate(['/blog', this.currentBlog.blogId]);
          }, 1000);
        },
        error => {
          console.log('Some error occured');
          console.log(error.errorMessage);
          this.toastr.error('Some error occured', 'Error');
        }
      );
  }
}
