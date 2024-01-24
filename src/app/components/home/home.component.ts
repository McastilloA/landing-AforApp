import { Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SetMetaTagService } from 'src/app/shared/services/setMetaTag/setMetaTag.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /** Variabls globales */
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;
  private route = inject(ActivatedRoute);
  private setMetaTagService = inject(SetMetaTagService);

  constructor() {
    this.setMetaTagService.setMetaTag('Inicio', 'Gestiona el aforo', 'Controla eventos, ¡Eventos seguros!, ¡Eventos exitosos!, nuestros clientes');
  }

  ngOnInit(): void {
    this.initSectionScroll();
  }

  initSectionScroll() {
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
