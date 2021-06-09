import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpmComponent } from './bpm.component';
import { Bpm000Component } from './bpm000/bpm000.component';
import { Bpm001Component } from './bpm001/bpm001.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BpmRoutingModule } from './bpm-routing.module';


@NgModule({
  declarations: [
    BpmComponent,
    Bpm000Component,
    Bpm001Component,
  ],
  imports: [
    SharedModule,
    BpmRoutingModule
  ]
})
export class BpmModule { }
