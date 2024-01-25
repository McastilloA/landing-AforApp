import { ViewportScroller } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SetMetaTagService {

  /** Variabls globales */
  private tile = inject(Title);
  private meta = inject(Meta);
  private viewPortScroll = inject(ViewportScroller);


  setMetaTag(title: string, description: string, keywords: string) {
    this.tile.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  scrollToTop() {
    const element = document.getElementById('nav-section');
    if (element) {
      this.viewPortScroll.scrollToPosition([0, 0]);
    }
  }

}
