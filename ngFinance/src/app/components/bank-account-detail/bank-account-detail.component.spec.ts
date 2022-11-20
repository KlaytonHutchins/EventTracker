import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountDetailComponent } from './bank-account-detail.component';

describe('BankAccountDetailComponent', () => {
  let component: BankAccountDetailComponent;
  let fixture: ComponentFixture<BankAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
