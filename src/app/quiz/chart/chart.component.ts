import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() public answerOne: number;
  @Input() public answerTwo: number;
  @Input() public answerThree: number;
  @Input() public answerFour: number;
  @Input() public question: string;

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels: string[] = ['answer 1', 'answer 2', 'answer3', 'answer4'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[];

  ngOnInit() {
    this.barChartData = [
      {
        data: [this.answerOne, this.answerTwo, this.answerThree, this.answerFour],
        label: 'Question'.concat(this.question)
      }];
  }
}
