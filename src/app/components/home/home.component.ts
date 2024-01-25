import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { SetMetaTagService } from 'src/app/shared/services/setMetaTag/setMetaTag.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FontAwesomeModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  /** Variabls globales */
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;
  private unSubscribe$ = new Subject<void>();
  private setMetaTagService = inject(SetMetaTagService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.setMetaTagService.setMetaTag('Inicio', 'Gestiona el aforo', 'Controla eventos, ¡Eventos seguros!, ¡Eventos exitosos!, nuestros clientes');
  }

  ngOnInit(): void {
    this.initSectionScroll();
  }

  initSectionScroll() {
    this.route.fragment.pipe(takeUntil(this.unSubscribe$))
    .subscribe(fragment => {
      fragment ? this.scrollToSection(fragment) : this.setMetaTagService.scrollToTop();
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
