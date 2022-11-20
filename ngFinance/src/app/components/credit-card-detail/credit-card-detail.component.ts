import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { Payment } from 'src/app/models/payment';
import { Purchase } from 'src/app/models/purchase';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-credit-card-detail',
  templateUrl: './credit-card-detail.component.html',
  styleUrls: ['./credit-card-detail.component.css']
})
export class CreditCardDetailComponent implements OnInit {

  creditCard: CreditCard | null = null;
  creditCardId: number = 0;
  payments: Payment[] = [];
  purchases: Purchase[] = [];
  newPay: Payment = new Payment();
  newPur: Purchase = new Purchase();
  editPay: Payment | null = null;
  editPur: Purchase | null = null;
  selectedPay: Payment | null = null;
  selectedPur: Purchase | null = null;

  constructor(
    private creditCardSvc: CreditCardService,
    private purchaseSvc: PurchaseService,
    private paymentSvc: PaymentService,
    private router: Router
  ) { }

  setCCId() {
    let strId = localStorage.getItem("id");
    if (strId) {
      this.creditCardId = parseInt(strId);
    }
    this.creditCardSvc.show(this.creditCardId).subscribe({
      next: (data) => {
        this.creditCard = data;
      },
      error: (fail) => {
      }
    });
    localStorage.removeItem("id");
  }

  reload() {
    this.paymentSvc.index(this.creditCardId).subscribe({
      next: (data) => {
        console.log(data);
        this.payments = data;
      },
      error: (fail) => {
        console.error('CreditCardDetailComponent.reload: error getting Payments');
        console.error(fail);
      }
    });
    this.purchaseSvc.index(this.creditCardId).subscribe({
      next: (data) => {
        console.log(data);
        this.purchases = data;
      },
      error: (fail) => {
        console.error('CreditCardDetailComponent.reload: error getting Purchases');
        console.error(fail);
      }
    });
    this.creditCardSvc.show(this.creditCardId).subscribe({
      next: (data) => {
        this.creditCard = data;
      },
      error: (fail) => {
      }
    });
  }

  addPayment(payment: Payment) {
    this.paymentSvc.create(this.creditCardId, payment).subscribe({
      next: (result) => {
        this.reload();
        this.newPay = new Payment();
      },
      error: (err) => {
        console.error('CreditCardDetailComponent.addPayment() error creating Payment');
        console.error(err);
      }
    });
  }

  addPurchase(purchase: Purchase) {
    this.purchaseSvc.create(this.creditCardId, purchase).subscribe({
      next: (result) => {
        this.reload();
        this.newPur = new Purchase();
      },
      error: (err) => {
        console.error('CreditCardDetailComponent.addPurchase() error creating Purchase');
        console.error(err);
      }
    });
  }

  setEditPayment(): void {
    this.editPay = Object.assign({}, this.selectedPay);
  }

  updatePayment(newPay: Payment): void {
    this.paymentSvc.update(this.creditCardId, this.newPay).subscribe({
      next: (result) => {
        this.selectedPay = result;
        this.editPay = null;
        this.reload();
      },
      error: (err) => {
        console.error('CreditCardDetailComponent.updatePayment() error updating Payment');
        console.error(err);
      }
    });
  }

  setEditPurchase(): void {
    this.editPur = Object.assign({}, this.selectedPur);
  }

  updatePurchase(newPur: Purchase): void {
    this.purchaseSvc.update(this.creditCardId, this.newPur).subscribe({
      next: (result) => {
        this.selectedPur = result;
        this.editPur = null;
        this.reload();
      },
      error: (err) => {
        console.error('CreditCardDetailComponent.updatePurchase() error updating Purchase');
        console.error(err);
      }
    });
  }

  deletePayment(paymentId: number) {
    this.paymentSvc.destroy(this.creditCardId, paymentId).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (err) => {
        console.error('CreditCardDetailComponent.deletePayment() error deleting Payment');
        console.error(err);
      }
    });
  }

  deletePurchase(purchaseId: number) {
    this.purchaseSvc.destroy(this.creditCardId, purchaseId).subscribe({
      next: (result) => {
        this.reload();
      },
      error: (err) => {
        console.error('CreditCardDetailComponent.deletePurchase() error deleting Purchase');
        console.error(err);
      }
    });
  }

  ngOnInit(): void {
    this.setCCId();
    this.reload();
  }

}
