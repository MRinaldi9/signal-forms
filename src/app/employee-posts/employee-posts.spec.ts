import { ComponentFixture, TestBed } from '@angular/core/testing';

import EmployeePosts from './employee-posts';

describe('EmployeePosts', () => {
  let component: EmployeePosts;
  let fixture: ComponentFixture<EmployeePosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
