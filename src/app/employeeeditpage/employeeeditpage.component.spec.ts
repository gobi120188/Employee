import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeeditpageComponent } from './employeeeditpage.component';

describe('EmployeeeditpageComponent', () => {
  let component: EmployeeeditpageComponent;
  let fixture: ComponentFixture<EmployeeeditpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeeditpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeeditpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
