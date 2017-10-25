import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegralManageComponent } from './integral-manage.component';

describe('IntegralManageComponent', () => {
  let component: IntegralManageComponent;
  let fixture: ComponentFixture<IntegralManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegralManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegralManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
