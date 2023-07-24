import { Component } from '@angular/core';
import { OnInit } from '@angular/core'
import * as d3 from 'd3';
import {COVID_DATA} from '../../app/covid-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit{ 
  getDetailsPerCountry: any;
  private svg: any;
  private gx: any;
  private gy: any;
  private x: any;
  private y: any;
  private xAxis: any;
  private marginTop = 20;
  private marginBottom = 30;
  private marginLeft = 40;
  private marginRight = 0;
  private width = 750;
  private height = 500;
  selected:any;

  subscription: Subscription = new Subscription;
  intervalId: any;


  order = [
    {value: 0, viewValue: 'Alphabetical'},
    {value: 1, viewValue: 'Frequency ,asc'},
    {value: 2, viewValue: 'Frequency ,desc'},
  ];

  data = COVID_DATA;

  constructor() { }

  ngOnInit(): void {

    this.createSvg();
    this.drawBars(this.data);

    this.intervalId = setInterval(()=>this.update(), 10000);
    this.selected = setInterval(()=>this.changeSelected(), 9000);
    
  }

  private changeSelected(): void {
    this.selected = Math.floor((Math.random() * 2) + 1);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bars")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g");
  }


   update(): void {
    if(this.selected === 0) {
    this.x.domain(this.data.sort((a,b) => a.letter > b.letter?1:-1).map(d => d.letter));
    }else if(this.selected === 1){
      this.x.domain(this.data.sort((a,b) => a.frequency > b.frequency?1:-1).map(d => d.letter)); 
    }else{
      this.x.domain(this.data.sort((a,b) => b.frequency > a.frequency?1:-1).map(d => d.letter)); 
    }

    this.svg.transition().duration(750);

    this.svg.selectAll("rect")
    .data(this.data,(d: { letter: any; })=>d.letter)
    .order()
    .transition().duration(750)
    .delay((d: any, i: number) =>i*50)
    .attr("x", (d: { letter: any; }) =>this.x(d.letter));


  this.gx.transition().duration(750)
        .call(this.xAxis)
      .selectAll(".tick")
        .delay((d: any, i: number) => i * 50);
  }

  private drawBars(data: any[]): void {
    console.log(data.map(d => d.letter));
    console.log(data.map(d => d));
    console.log(data.sort((a,b) => a.letter > b.letter? 1:-1));
    
    
    this.x =d3.scaleBand()
    .domain(data.map(d => d.letter))
    .range([this.marginLeft, this.width-this.marginRight])
    .padding(0.2);

    this.xAxis = d3.axisBottom(this.x).tickSizeOuter(0);

    this.y = d3.scaleLinear()
    .domain([0, d3.max(data, d=> d.frequency)]).nice()
    .range([this.height - this.marginBottom, this.marginTop]);

    this.svg.append("g")
    .call(d3.axisLeft(this.y));

    this.svg.append("g")
    .attr("viewBox", [0,0,this.width,this.height])
    .attr("style", `max-width: ${this.width}px; height:auto; font: 10px sans-serif; overflow: visible;`);

  // Create a bar for each letter.
  this.svg
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .style("mix-blend-mode", "multiply") // Darker color when bars overlap during the transition.
      .attr("x", (d: any) => this.x(d.letter))
      .attr("y", (d: any) => this.y(d.frequency))
      .attr("width", this.x.bandwidth())
      .attr("height", (d: any) => this.y(0) - this.y(d.frequency));

  this.gx = this.svg.append("g")
  .attr("transform", `translate(0, ${this.height - this.marginBottom})`)
  .call(this.xAxis);

  this.gy = this.svg.append("g")
  .attr("transform", `translate(${this.marginLeft}, 0)`)
  .call(d3.axisLeft(this.y).tickFormat((y: any) => (y*100).toFixed()))
  .call((g: any) => g.select(".domain").remove());

  }
}