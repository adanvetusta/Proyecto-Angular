import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.scss']
})
export class NopagefoundComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
