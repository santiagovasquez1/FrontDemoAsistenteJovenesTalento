import { Routes } from '@angular/router';
import { ChatbotMenuComponent } from '../app/chatbot-menu/chatbot-menu.component';
import { HomeComponent } from '../app/home/home.component';




export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    { path: 'chatbot', component: ChatbotMenuComponent }
];


