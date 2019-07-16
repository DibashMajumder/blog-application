import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogHttpService } from '../blog-http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  public blogTitle: string;
  public blogBodyHtml: string;
  public blogDescription: string;
  public blogCategory: string;
  public possibleCategories = ['Comedy', 'Drama', 'Action', 'Technology'];

  constructor(private _route: ActivatedRoute, private router: Router, private blogHttpService: BlogHttpService, private toastr: ToastrService) {
    console.log('Blog Create constructor is called');
  }

  ngOnInit() {
    console.log('Blog Create ngOnInit() is called');
  }

  public createBlog(): any {
    let blogData = {
      title: this.blogTitle,
      description: this.blogDescription,
      blogBody: this.blogBodyHtml,
      category: this.blogCategory
    };

    console.log(blogData);

    this.blogHttpService.createBlog(blogData).subscribe(
      data =>{
        console.log('Blog Created');
        console.log(data);
        this.toastr.success('Blog created successfully', 'Success');
        setTimeout(()=>{
          this.router.navigate(['/blog', data.data.blogId])
        },1000);
      },
      error =>{
        console.log('Some error occured while creating blog');
        console.log(error.errorMessage);
        this.toastr.error('Some error ocuured', 'Error');
      }
    )
    
  }

}
