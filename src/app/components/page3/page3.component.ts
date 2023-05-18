import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle, faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-page3',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {

  /** Variabls globales */
  faUserCircle = faUserCircle;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;

  constructor() { }

  ngOnInit(): void { }

}
