import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

import { ListAssociatedService } from 'src/app/shared/services/associated/list-associated.service';
import { AlertService } from 'src/app/shared/services/message/alert.service';

import { RespServiceAssociated } from 'src/app/shared/interfaces/respService';
import { Associated } from 'src/app/shared/interfaces/associated';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faPhone, faEdit, faEnvelope } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-associated',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './associated.component.html',
  styleUrls: ['./associated.component.css'],
  providers: [DatePipe]
})
export class AssociatedComponent implements OnInit {

  /** Variabls globales */
  faUsers = faUsers;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faEdit = faEdit;
  nowDate!: Date;
  formGroupAssociated!: FormGroup;
  listAssociated!: RespServiceAssociated;
  showSpinner!: boolean;

  constructor(private fb: FormBuilder, private datepipe: DatePipe, 
    private listAssociatedService: ListAssociatedService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.intiForm();
    this.getAllUser();
  }

  intiForm(): void {
    this.nowDate = new Date();
    this.formGroupAssociated = this.fb.group({
      id: [null],
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      timeNowDate: [this.datepipe.transform(this.nowDate, 'yyyy-MM-dd')],
      affair: [null, [Validators.required, Validators.maxLength(50)]],
      message: [null, [Validators.maxLength(1000)]]
    });
  }

  getAllUser(): void {
    this.showSpinner = true;
    this.listAssociatedService.getAllAssociated().subscribe({
      next: (resp: RespServiceAssociated) => {
        this.showSpinner = false;
        if (resp.status) {
          this.listAssociated = resp;
        } else {
          this.alertService.toastFail(resp.message);
        }
      },
      error: () => {
        this.showSpinner = false;
        this.alertService.modalFail();
      }
    });
  }

  updateUser(): void {
    if (this.formGroupAssociated.valid) {
      this.showSpinner = true;
      this.listAssociatedService.updateAssociated(this.formGroupAssociated.value).subscribe({
        next: (resp: RespServiceAssociated) => {
          if (resp.status) {
            this.getAllUser();
            this.formGroupAssociated.reset();
            this.alertService.toastSuccess(resp.message);
          } else {
            this.showSpinner = false;
            this.alertService.toastFail(resp.message);
          }
        },
        error: () => {
          this.showSpinner = false;
          this.alertService.modalFail();
        },
      });
    }
  }

  deleteUser(userId: Associated): void {
    this.showSpinner = true;
    this.listAssociatedService.deleteAssociated(userId).subscribe({
      next: (resp: RespServiceAssociated) => {
        if (resp.status) {
          this.getAllUser();
          this.alertService.toastSuccess(resp.message);
        } else {
          this.showSpinner = false;
          this.alertService.toastFail(resp.message);
        }
      },
      error: () => {
        this.showSpinner = false;
        this.alertService.modalFail();
      },
    });
  }

  scrollToSectionTop(section: HTMLElement, userInfo: Associated): void {
    this.updateUserInField(userInfo);
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  updateUserInField(userInfo: Associated) {
    this.formGroupAssociated.patchValue({
      id: userInfo.id,
      fullName: userInfo.fullName,
      email: userInfo.email,
      phone: userInfo.phone,
      timeNowDate: userInfo.timeNowDate,
      affair: userInfo.affair,
      message: userInfo.message
    });
  }

}
