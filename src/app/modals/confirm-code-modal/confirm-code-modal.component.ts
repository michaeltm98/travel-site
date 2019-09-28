import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-code-modal',
  templateUrl: './confirm-code-modal.component.html',
  styleUrls: ['./confirm-code-modal.component.css']
})
export class ConfirmCodeModalComponent implements OnInit {
  confirmationCode: string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  submitCode(): void {
    console.log(this.confirmationCode);
    this.activeModal.close(this.confirmationCode)
  }

  

}
