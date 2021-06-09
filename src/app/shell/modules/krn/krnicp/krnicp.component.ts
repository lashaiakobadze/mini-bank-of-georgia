import { Component, OnInit } from '@angular/core';
import { ShellService } from 'src/app/shell/shell.service';

@Component({
  selector: 'bg-krincp',
  templateUrl: './krnicp.component.html',
  styleUrls: ['./krnicp.component.scss']
})
export class KrnicpComponent implements OnInit {

  constructor(
    private shellService: ShellService
  ) { }

  ngOnInit(): void {
    this.shellService.curClient.subscribe(user => {
      if (!user) {
        console.log('ar aris mosuli');
      }
      console.log('useriii', user);
    });
  }

  getCurUser() {
    this.shellService.curClient.subscribe(user => {
      console.log(user);
    });
  }

}
