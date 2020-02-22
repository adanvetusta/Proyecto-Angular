import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
const appRoutes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    //Cualquier ruta no definida irá al nopagefoundcomponent
    {
        path: '**', component: NopagefoundComponent
    }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });