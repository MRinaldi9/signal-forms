import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInput } from './control-input';

describe('ControlInput', () => {
  let component: ControlInput;
  let fixture: ComponentFixture<ControlInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
