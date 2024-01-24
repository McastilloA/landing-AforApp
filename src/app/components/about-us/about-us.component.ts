import { Component, inject } from '@angular/core';
import { SetMetaTagService } from 'src/app/shared/services/setMetaTag/setMetaTag.service';

@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  /** Variabls globales */
  private setMetaTagService = inject(SetMetaTagService);

  constructor() {
    this.setMetaTagService.setMetaTag('Quiénes somos', 'El ABC de AFORAPP', '¿Para quién es?, ¡Calidad y compromiso!, ¡Expertos en tecnología!');
  }

}
