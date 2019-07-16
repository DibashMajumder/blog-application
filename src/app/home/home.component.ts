import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allBlogs = [];

  constructor(private blogHttpService: BlogHttpService) {
    console.log('Home Component contstructor is called');
  }

  ngOnInit() {
    console.log('Home ngOnInit is called');
    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
      data => {
        console.log('Logging data');
        console.log(data);
        this.allBlogs = data['data'];
      },
      error => {
        console.log('Some error occured in home component');
        console.log(error.errorMessage);
      }
    );
  }
}
