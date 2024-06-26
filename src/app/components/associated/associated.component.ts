import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ListAssociatedService } from 'src/app/shared/services/associated/list-associated.service';
import { SetMetaTagService } from 'src/app/shared/services/setMetaTag/setMetaTag.service';
import { AlertService } from 'src/app/shared/services/message/alert.service';
import { RespServiceAssociated } from 'src/app/shared/interfaces/respService';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faPhone,
  faEdit,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-associated',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './associated.component.html',
  styleUrls: ['./associated.component.css'],
  providers: [DatePipe],
})
export class AssociatedComponent implements OnInit, AfterViewInit, OnDestroy {
  /** Variabls globales */
  public faUsers = faUsers;
  public faPhone = faPhone;
  public faEnvelope = faEnvelope;
  public faEdit = faEdit;
  public nowDate!: Date;
  private unSubscribe$ = new Subject<void>();
  public formGroupAssociated!: FormGroup;
  public listAssociated!: RespServiceAssociated;
  public showSpinner!: boolean;
  private setMetaTagService = inject(SetMetaTagService);
  private alertService = inject(AlertService);

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private listAssociatedService: ListAssociatedService
  ) {
    this.setMetaTagService.setMetaTag(
      'Asociados',
      'Listado de asociados',
      'usuarios, listado, datos, ingresar datos'
    );
  }

  ngOnInit(): void {
    this.intiForm();
    this.getAllUser();
  }

  ngAfterViewInit() {
    this.setMetaTagService.scrollToTop();
  }

  intiForm(): void {
    this.nowDate = new Date();
    this.formGroupAssociated = this.fb.group({
      id: [null],
      fullName: [null, [Validators.required, Validators.maxLength(50)]],
      email: [
        null,
        [Validators.required, Validators.email, Validators.maxLength(30)],
      ],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      timeNowDate: [this.datepipe.transform(this.nowDate, 'yyyy-MM-dd')],
      affair: [null, [Validators.required, Validators.maxLength(50)]],
      message: [null, [Validators.maxLength(1000)]]
    });
  }

  getAllUser(): void {
    this.showSpinner = true;
    this.listAssociatedService
      .getAllAssociated()
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
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
        },
      });
  }

  updateUser(): void {
    if (this.formGroupAssociated.valid) {
      this.showSpinner = true;
      this.listAssociatedService
        .updateAssociated(this.formGroupAssociated.value)
        .pipe(takeUntil(this.unSubscribe$))
        .subscribe({
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

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }
}
