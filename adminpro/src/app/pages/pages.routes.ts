import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
    //Cualquier ruta vacía hará un redirect to al dashboard
    {
        path: '', component: PagesComponent,
        children: [
            {
                path: 'progress', component: ProgressComponent
            },
            {
                path: 'graficas1', component: Graficas1Component
            },
            {
                path: 'dashboard', component: DashboardComponent
            },
            {
                path: 'account-settings', component: AccountSettingsComponent
            },
            {
                path: '', redirectTo: '/dashboard', pathMatch: 'full'
            }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
