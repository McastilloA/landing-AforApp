import { Component, OnInit } from '@angular/core';

import { faFacebook, faTwitter, faInstagram, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /** Variabls globales */
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  faYoutube = faYoutube;

  constructor() { }

  ngOnInit(): void {
  }

}
