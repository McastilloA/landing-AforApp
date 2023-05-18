import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  /** Variabls globales */
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      this.scrollToSection(fragment!);
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

}
