import { TestBed } from '@angular/core/testing';

import { signal, twoWayBinding } from '@angular/core';
import { CriteriaTerms } from './criteria-terms';

describe('CriteriaTerms', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriaTerms],
    }).compileComponents();
  });
  it('should be checked', async () => {
    const fixture = TestBed.createComponent(CriteriaTerms, {
      bindings: [twoWayBinding('checked', signal(true))],
    });
    const instance = fixture.componentInstance;
    await fixture.whenStable();
    expect(instance).toBeTruthy();
    expect(instance.checked()).toBe(true);
  });
});
