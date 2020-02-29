import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gracico-dona',
  templateUrl: './gracico-dona.component.html',
  styleUrls: []
})
export class GracicoDonaComponent implements OnInit {

  constructor() { }

  @Input() public chartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public chartData: number[] = [350, 450, 100];
  @Input() public chartType: string = 'doughnut';

  ngOnInit(): void {
  }

}
