import { Routes } from '@angular/router';
import { FeaturesComponent } from "./features.component";

export const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            {
                path: '',
                redirectTo: 'repos',
                pathMatch: 'full'
            },
            {
                path: 'commits/:owner/:repo',
                loadComponent: () => import('./commits/commits.component').then((x) => x.CommitsComponent),
            },
            {
                path: 'repos',
                loadComponent: () => import('./repos/repos.component').then((x) => x.ReposComponent),
        
            },
            {
                path: '**',
                redirectTo: 'repos'
            }
        ]
    },
];