import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

import { RespServiceAssociated } from 'src/app/shared/interfaces/respService';

import { ListAssociatedService } from 'src/app/shared/services/associated/list-associated.service';
import { SetMetaTagService } from 'src/app/shared/services/setMetaTag/setMetaTag.service';
import { AlertService } from 'src/app/shared/services/message/alert.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  providers: [DatePipe]
})
export class ContactUsComponent implements OnInit {

  /** Variabls globales */
  public faUserCircle = faUserCircle;
  public faEnvelope = faEnvelope;
  public faPhone = faPhone;
  public faMapMarkerAlt = faMapMarkerAlt;
  private nowDate!: Date;
  public formGroupAssociated!: FormGroup;
  public showSpinner!: boolean;
  private setMetaTagService = inject(SetMetaTagService);

  constructor(private fb: FormBuilder, private datepipe: DatePipe,
    private listAssociatedService: ListAssociatedService,
    private alertService: AlertService) {
    this.setMetaTagService.setMetaTag('Contáctanos', 'Envia tu mensaje', 'contáctanos, comunicate con nosotros, más información');
  }

  ngOnInit(): void {
    this.intiForm();
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

  registerUser(): void {
    if (this.formGroupAssociated.valid) {
      this.showSpinner = true;
      this.listAssociatedService.addAssociated(this.formGroupAssociated.value).subscribe({
        next: (resp: RespServiceAssociated) => {
          this.showSpinner = false;
          if (resp.status) {
            this.formGroupAssociated.reset();
            this.alertService.toastSuccess(resp.message);
          } else {
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

}
