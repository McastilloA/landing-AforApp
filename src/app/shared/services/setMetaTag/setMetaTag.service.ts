import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SetMetaTagService {

  /** Variabls globales */
  private tile = inject(Title);
  private meta = inject(Meta);


  setMetaTag(title: string, description: string, keywords: string) {
    this.tile.setTitle(title);
    this.meta.updateTag({ name: 'title', content: title });
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

}
