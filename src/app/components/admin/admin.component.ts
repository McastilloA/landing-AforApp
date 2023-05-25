import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ListCapacityService } from 'src/app/shared/services/list-capacity.service';

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
  nowDate = new Date();
  listUsers!: RespService;
  showSpinner!: boolean;
  action = 0;

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private listCapacityService: ListCapacityService) { }

  ngOnInit(): void {
    this.capacityForm();
    this.getAllUser();
  }

  capacityForm(): void {
    this.formGroupCapacity = this.fb.group({
      id: [],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      typeDocument: [null, [Validators.required, Validators.maxLength(3)]],
      document: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      birthDate: [null, [Validators.required]],
      timeNowDate: [this.datepipe.transform(this.nowDate, 'yyyy-MM-dd hh:mm:ss')]
    });
  }

  getAllUser(): void {
    this.showSpinner = true;

    this.listCapacityService.getAllCapacity().subscribe({
      next: (resp: RespService) => {
        this.listUsers = resp;
        this.showSpinner = false;
      },
      error: () => {
        this.showSpinner = false;
        this.messageServerFail();
      }
    });
  }

  registerUser(): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.addCapacity(this.formGroupCapacity.value).subscribe({
        next: (resp: RespService) => {
          this.messageSuccess(resp.message);
          this.formGroupCapacity.reset();
          this.getAllUser();
        },
        error: () => {
          this.showSpinner = false;
          this.messageServerFail();
        },
      });
    }
  }

  updateUser(): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.updateCapacity(this.formGroupCapacity.value).subscribe({
        next: (resp: RespService) => {
          this.action = 0;
          this.messageSuccess(resp.message);
          this.formGroupCapacity.reset();
          this.getAllUser();
        },
        error: () => {
          this.showSpinner = false;
          this.messageServerFail();
        },
      });
    }
  }

  registerExit(): void {
    this.showSpinner = true;
    this.listCapacityService.updateCapacity(this.formGroupCapacity.value).subscribe({
      next: (resp: RespService) => {
        this.messageSuccess(resp.message);
        this.getAllUser();
      },
      error: () => {
        this.showSpinner = false;
        this.messageServerFail();
      },
    });
  }

  deleteUser(userId: Capacity): void {
    this.showSpinner = true;
    this.listCapacityService.deleteCapacity(userId).subscribe({
      next: (resp: RespService) => {
        this.messageSuccess(resp.message);
        this.getAllUser();
      },
      error: () => {
        this.showSpinner = false;
        this.messageServerFail();
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
      timeNowDate: userInfo.timeNowDate
    });
  }

  /**
   * Función que abre el modal por falla de servidor.
   */
  messageServerFail() {
    Swal.fire({
      title: 'Error en el servidor',
      text: '"Lo sentimos, se ha producido un error en el servidor y no se puede completar tu solicitud en este momento."',
      icon: 'error',
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#3085d6',
    });
  }

  /**
   * Función que abre modal satisfactorio.
   * @param message descripción del mensaje.
   */
  messageSuccess(message: any) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

}
