import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService , LoginGuardGuard, UploadFileService, HospitalService, MedicoService, AdminGuard, VerificaTokenGuard } from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, UploadFileService, ModalUploadService, HospitalService, MedicoService, AdminGuard, VerificaTokenGuard]
})
export class ServiceModule { }
