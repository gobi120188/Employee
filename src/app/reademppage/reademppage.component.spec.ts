import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReademppageComponent } from './reademppage.component';

describe('ReademppageComponent', () => {
  let component: ReademppageComponent;
  let fixture: ComponentFixture<ReademppageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReademppageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReademppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
