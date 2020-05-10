import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, UsuarioService , LoginGuardGuard, UploadFileService} from './service.index';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, UploadFileService]
})
export class ServiceModule { }
