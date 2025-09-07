import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeePost } from './employee-post.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeePostsData {
  getPosts() {
    return httpResource<EmployeePost[]>(() => '/posts?_page=1');
  }
}
