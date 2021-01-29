import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'AngularD3Charts';
}

//BarChart
const BarData = [
  { name: "A", value: 70 },
  { name: "B", value: 20 },
  { name: "C", value: 20 },
  { name: "D", value: 30 },
  { name: "E", value: 20 },
  { name: "F", value: 80 },
  { name: "G", value: 50 },
];