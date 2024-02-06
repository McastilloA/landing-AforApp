import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { RouterModule, Router, NavigationStart } from '@angular/router';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, NgOptimizedImage],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {

  /** Variabls globales */
  public stateRol!: string;
  private unSubscribe$ = new Subject<void>();
  @ViewChild("navbarText") navbar!: ElementRef;
  @ViewChild("btn") btn!: ElementRef;
  private router = inject(Router);
  private render = inject(Renderer2);

  ngOnInit(): void {
    this.validateRol();
  }

  ngAfterViewInit() {
    this.subscribeToRouterEvents();
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

  /**
   * Subscribes to router events and hides the navbar when a navigation start event occurs.
   * @returns {void}
   */
  subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unSubscribe$)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.hideNavbar();
      }
    });
  }

  hideNavbar() {
    this.render.removeClass(this.navbar.nativeElement, 'show');
    this.render.addClass(this.btn.nativeElement, 'collapsed');
    this.render.setAttribute(this.btn.nativeElement, 'aria-expanded', 'false');
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }

}
