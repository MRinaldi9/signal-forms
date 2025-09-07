import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeePostsStore } from './employee-posts.store';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-employee-posts',
  imports: [TitleCasePipe],
  templateUrl: './employee-posts.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EmployeePostsStore],
  host: { class: 'space-y-6' },
})
export default class EmployeePosts {
  readonly #employeePostsStore = inject(EmployeePostsStore);

  protected postsLoading = this.#employeePostsStore.postsIsLoading;
  protected postsError = this.#employeePostsStore.postsError;
  protected postsExists = this.#employeePostsStore.postsHasValue;
  protected posts = this.#employeePostsStore.postsValue;
  constructor() {}
}
