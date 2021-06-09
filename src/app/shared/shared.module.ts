import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupDirective } from './directives/popup.directive';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { ClientDirective } from './directives/client.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    PopupDirective,
    ClientDirective,
    PlaceholderDirective,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoaderComponent,
    PopupDirective,
    ClientDirective,
    PlaceholderDirective,
    AlertComponent
  ]
})
export class SharedModule { }
