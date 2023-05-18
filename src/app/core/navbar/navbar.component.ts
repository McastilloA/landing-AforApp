import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /** Variabls globales */
  stateRol = 'admin';

  constructor() { }

  ngOnInit(): void { }

  validateRol() {
    this.stateRol = sessionStorage.getItem('rol')!;
  }

}
