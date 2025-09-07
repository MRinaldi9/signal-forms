import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaTerms } from './criteria-terms';

describe('CriteriaTerms', () => {
  let component: CriteriaTerms;
  let fixture: ComponentFixture<CriteriaTerms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriaTerms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaTerms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
