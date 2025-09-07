import { withResource } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { signalStore, withProps } from '@ngrx/signals';
import { EmployeePostsData } from './+data/employee-posts-data';

export const EmployeePostsStore = signalStore(
  withProps(() => ({ employeePostService: inject(EmployeePostsData) })),
  withResource(({ employeePostService }) => ({
    posts: employeePostService.getPosts(),
  })),
);
