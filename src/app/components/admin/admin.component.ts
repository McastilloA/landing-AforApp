import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ListCapacityService } from 'src/app/shared/services/capacity/list-capacity.service';

import { RespService } from 'src/app/shared/interfaces/respService';

import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

import { Capacity } from 'src/app/shared/interfaces/capacity';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQrcode, faTrash, faEdit, faSignOut } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe]
})
export class AdminComponent implements OnInit {

  /** Variabls globales */
  faQrcode = faQrcode;
  faTrash = faTrash;
  faEdit = faEdit;
  faSignOut = faSignOut;
  formGroupCapacity!: FormGroup;
  nowDate!: Date;
  listUsers!: RespService;
  showSpinner!: boolean;
  action = 0;

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private listCapacityService: ListCapacityService) { }

  ngOnInit(): void {
    this.capacityForm();
    this.getAllUser();
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
    this.listCapacityService.getAllCapacity().subscribe({
      next: (resp: RespService) => {
        this.showSpinner = false;
        if (resp.status) {
          this.listUsers = resp;
        } else {
          this.toastFail(resp.message);
        }
      },
      error: () => {
        this.showSpinner = false;
        this.modalFail();
      }
    });
  }

  registerUser(): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.addCapacity(this.formGroupCapacity.value).subscribe({
        next: (resp: RespService) => {
          if (resp.status) {
            this.getAllUser();
            this.formGroupCapacity.reset();
            this.toastSuccess(resp.message);
          } else {
            this.showSpinner = false;
            this.toastFail(resp.message);
          }
        },
        error: () => {
          this.showSpinner = false;
          this.modalFail();
        },
      });
    }
  }

  updateUser(): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.updateCapacity(this.formGroupCapacity.value).subscribe({
        next: (resp: RespService) => {
          if (resp.status) {
            this.action = 0;
            this.getAllUser();
            this.formGroupCapacity.reset();
            this.toastSuccess(resp.message);
          } else {
            this.showSpinner = false;
            this.toastFail(resp.message);
          }
        },
        error: () => {
          this.showSpinner = false;
          this.modalFail();
        },
      });
    }
  }

  registerExit(user: Capacity): void {
    this.showSpinner = true;
    this.nowDate = new Date();
    const request: any = user;
    request.timeAfterDate = this.datepipe.transform(this.nowDate, 'yyyy-MM-dd hh:mm:ss');

    this.listCapacityService.updateCapacity(request).subscribe({
      next: (resp: RespService) => {
        this.showSpinner = false;
        if (resp.status) {
          this.getAllUser();
          this.toastSuccess(resp.message);
        } else {
          this.toastFail(resp.message);
        }
      },
      error: () => {
        this.showSpinner = false;
        this.modalFail();
      },
    });
  }

  deleteUser(userId: Capacity): void {
    this.showSpinner = true;
    this.listCapacityService.deleteCapacity(userId).subscribe({
      next: (resp: RespService) => {
        if (resp.status) {
          this.getAllUser();
          this.toastSuccess(resp.message);
        } else {
          this.showSpinner = false;
          this.toastFail(resp.message);
        }
      },
      error: () => {
        this.showSpinner = false;
        this.modalFail();
      },
    });
  }

  scrollToSectionTop(section: HTMLElement, userInfo: Capacity): void {
    this.action = 1;
    this.updateUserInField(userInfo);
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  /**
   * Función que abre el modal por falla de servidor.
   */
  modalFail() {
    Swal.fire({
      title: 'Error del servidor',
      text: '"Lo sentimos, se ha producido un error en el servidor y no se puede completar tu solicitud en este momento."',
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3085d6',
    });
  }

  /**
   * Función que abre toast satisfactorio.
   * @param message descripción del mensaje.
   */
  toastSuccess(message: any) {
    Swal.fire({
      title: message,
      icon: 'success',
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  /**
   * Función que abre toast fallido.
   * @param message descripción del mensaje.
   */
  toastFail(message: any) {
    Swal.fire({
      title: 'Lo sentimos',
      text: message,
      icon: 'info',
      position: 'top-right',
      showConfirmButton: false,
      timer: 4000
    });
  }

}
