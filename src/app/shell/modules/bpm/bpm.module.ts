import { NgModule } from '@angular/core';

import { BpmRoutingModule } from './bpm-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BpmComponent } from './bpm.component';
import { Bpm000Component } from './bpm000/bpm000.component';
import { Bpm001Component } from './bpm001/bpm001.component';


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
