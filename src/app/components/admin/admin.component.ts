import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { ListCapacityService } from 'src/app/shared/services/capacity/list-capacity.service';
import { SetMetaTagService } from 'src/app/shared/services/setMetaTag/setMetaTag.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { AlertService } from 'src/app/shared/services/message/alert.service';
import { RespService } from 'src/app/shared/interfaces/respService';
import { Capacity } from 'src/app/shared/interfaces/capacity';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQrcode, faTrash, faEdit, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe]
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Variabls globales */
  private unSubscribe$ = new Subject<void>();
  public faQrcode = faQrcode;
  public faTrash = faTrash;
  public faEdit = faEdit;
  public faSignOut = faSignOut;
  public formGroupCapacity!: FormGroup;
  public nowDate!: Date;
  public listUsers!: RespService;
  public showSpinner!: boolean;
  public action = 0;
  private setMetaTagService = inject(SetMetaTagService);

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private listCapacityService: ListCapacityService,
    private alertService: AlertService) {
    this.setMetaTagService.setMetaTag('Admin', 'Listado de usuarios registrados', 'usuarios, listado, datos, ingresar datos');
  }

  ngOnInit(): void {
    this.capacityForm();
    this.getAllUser();
  }

  ngAfterViewInit() {
    this.setMetaTagService.scrollToTop();
  }

  capacityForm(): void {
    this.nowDate = new Date();
    this.formGroupCapacity = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      typeDocument: [null, [Validators.required, Validators.maxLength(3)]],
      document: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      birthDate: [null, [Validators.required]],
      timeNowDate: [this.datepipe.transform(this.nowDate, 'yyyy-MM-dd hh:mm:ss')],
      timeAfterDate: [null]
    });
  }

  getAllUser(): void {
    this.showSpinner = true;
    this.listCapacityService.getAllCapacity().pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (resp: RespService) => {
          this.showSpinner = false;
          if (resp.status) {
            this.listUsers = resp;
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

  registerUser(): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.addCapacity(this.formGroupCapacity.value).pipe(takeUntil(this.unSubscribe$))
        .subscribe({
          next: (resp: RespService) => {
            if (resp.status) {
              this.getAllUser();
              this.formGroupCapacity.reset();
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

  updateUser(): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.updateCapacity(this.formGroupCapacity.value).pipe(takeUntil(this.unSubscribe$))
        .subscribe({
          next: (resp: RespService) => {
            if (resp.status) {
              this.action = 0;
              this.getAllUser();
              this.formGroupCapacity.reset();
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

  registerExit(user: Capacity): void {
    this.showSpinner = true;
    this.nowDate = new Date();
    const request: any = user;
    request.timeAfterDate = this.datepipe.transform(this.nowDate, 'yyyy-MM-dd hh:mm:ss');

    this.listCapacityService.updateCapacity(request).pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (resp: RespService) => {
          this.showSpinner = false;
          if (resp.status) {
            this.getAllUser();
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

  deleteUser(userId: Capacity): void {
    this.showSpinner = true;
    this.listCapacityService.deleteCapacity(userId).pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (resp: RespService) => {
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

  scrollToSectionTop(userInfo: Capacity): void {
    this.action = 1;
    this.updateUserInField(userInfo);
    this.setMetaTagService.scrollToTop();
  }

  updateUserInField(userInfo: Capacity) {
    this.formGroupCapacity.patchValue({
      id: userInfo.id,
      name: userInfo.name,
      lastName: userInfo.lastName,
      typeDocument: userInfo.typeDocument,
      document: userInfo.document,
      email: userInfo.email,
      phone: userInfo.phone,
      birthDate: userInfo.birthDate,
      timeNowDate: userInfo.timeNowDate,
      timeAfterDate: userInfo.timeAfterDate
    });
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
