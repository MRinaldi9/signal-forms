import { TestBed } from '@angular/core/testing';

import { EmployeePostsData } from './employee-posts-data';

describe('EmployeePostsData', () => {
  let service: EmployeePostsData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePostsData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
