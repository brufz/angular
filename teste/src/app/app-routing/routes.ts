import {Routes} from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';



export const routes : Routes = [
    {path: "home", component: HomeComponent},
    {path:"contactus", component: ContactComponent},
    {path: "menu", component: MenuComponent},
    {path: "aboutus", component: AboutComponent},
    {path: '', redirectTo: 'home', pathMatch:'full'}

]