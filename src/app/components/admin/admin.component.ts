import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ListCapacityService } from 'src/app/shared/services/list-capacity.service';

import { RespService } from 'src/app/shared/interfaces/respService';

import { LoadingComponent } from 'src/app/core/loading/loading.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQrcode, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [DatePipe]
})
export class AdminComponent implements OnInit {

  /** Variabls globales */
  faQrcode = faQrcode;
  faTrash = faTrash;
  faEdit = faEdit;
  formGroupCapacity!: FormGroup;
  nowDate = new Date();
  listUsers!: RespService;
  showSpinner!: boolean;

  constructor(private fb: FormBuilder, private datepipe: DatePipe, private listCapacityService: ListCapacityService) { }

  ngOnInit(): void {
    this.capacityForm();
    this.getAllUser();
  }

  private capacityForm(): void {
    this.formGroupCapacity = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      typeDocument: [null, [Validators.required, Validators.maxLength(3)]],
      document: [null, [Validators.required, Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(30)]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      birthDate: [null, [Validators.required]],
      timeNowDate: [this.datepipe.transform(this.nowDate, 'yyyy-MM-dd hh:mm:ss')]
    });
  }

  public registerUser(section: HTMLElement): void {
    if (this.formGroupCapacity.valid) {
      this.showSpinner = true;
      this.listCapacityService.addCapacity(this.formGroupCapacity.value).subscribe(resp => {
        this.formGroupCapacity.reset();
        this.getAllUser();
        this.scrollToSectionBottom(section);
      }, () => {
        this.showSpinner = false;
      });
    }
  }

  private getAllUser(): void {
    this.showSpinner = true;
    this.listCapacityService.getAllCapacity().subscribe(resp => {
      this.listUsers = resp;
      this.showSpinner = false;
    }, () => {
      this.showSpinner = false;
    });
  }

  scrollToSectionTop(section: HTMLElement): void {
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  scrollToSectionBottom(section: HTMLElement): void {
    section.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

}
