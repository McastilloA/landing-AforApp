import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /** Variabls globales */
  stateRol!: string;

  constructor() { }

  ngOnInit(): void {
    this.validateRol();
  }

  validateRol() {
    if (sessionStorage.getItem('rol')) {
      this.stateRol = sessionStorage.getItem('rol')!;
    } else {
      this.stateRol = 'user';
    }
  }

}
