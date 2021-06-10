import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';

import { PopupDirective } from './directives/popup.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    PopupDirective,
    PlaceholderDirective,
    AlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LoaderComponent,
    PopupDirective,
    PlaceholderDirective,
    AlertComponent
  ]
})
export class SharedModule { }
