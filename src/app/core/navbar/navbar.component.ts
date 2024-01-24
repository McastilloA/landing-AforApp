import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, NgOptimizedImage],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  /** Variabls globales */
  stateRol!: string;

  ngOnInit(): void {
    this.validateRol();
  }

  /**
   * Validates the user's role by checking if the 'rol' key exists in the sessionStorage.
   * If it does, the value of the 'rol' key is assigned to the 'stateRol' variable.
   * If it doesn't, the 'stateRol' variable is assigned the value 'user'.
   * @returns {void}
   */
  validateRol(): void {
    this.stateRol = sessionStorage.getItem('rol') || 'user';
  }

}
