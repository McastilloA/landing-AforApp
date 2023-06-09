import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

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
