import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';      
import { CalendarModule } from 'primeng/calendar';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppLayoutComponent } from './app.layout.component';
import { AppConfigModule } from './config/config.module';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    SidebarModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    MenuModule,
    DialogModule,         // ✅ aquí importamos el dialog
    CalendarModule,       // ✅ aquí importamos el calendar
    RouterModule,
    AppConfigModule
  ],
  exports: [AppLayoutComponent]
})
export class AppLayoutModule { }

