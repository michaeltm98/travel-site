import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCodeModalComponent } from './confirm-code-modal.component';

describe('ConfirmCodeModalComponent', () => {
  let component: ConfirmCodeModalComponent;
  let fixture: ComponentFixture<ConfirmCodeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCodeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
