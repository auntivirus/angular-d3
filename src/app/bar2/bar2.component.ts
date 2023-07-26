import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import * as d3 from 'd3';
import { EVENTS_DATA } from './events_visitor_count';

@Component({
  selector: 'app-bar2',
  templateUrl: './bar2.component.html',
  styleUrls: ['./bar2.component.scss'],
})
export class Bar2Component implements OnInit {
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
  
  selected: any;
  
  intervalId: any;

  order = [
    { value: 0, viewValue: 'Alphabetical, asc' },
    { value: 1, viewValue: 'Alphabetical, des' },
    { value: 1, viewValue: 'Total Count, asc' },
    { value: 2, viewValue: 'Total Count, desc' },
  ];

  data = EVENTS_DATA;

  constructor() {}

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
    // this.intervalId = setInterval(()=>this.update(), 10000);
    // this.selected = setInterval(()=>this.changeSelected(), 9000);
  }

  private changeSelected(): void {
    this.selected = Math.floor(Math.random() * 2 + 1);
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bars2')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
  }

  update(): void {
    if (this.selected === 0) {
      this.x.domain(
        this.data
          .sort((a, b) => (a.event_id > b.event_id ? 1 : -1))
          .map((d) => d.event_id)
      );
    } else if (this.selected === 1) {
      this.x.domain(
        this.data
          .sort((a, b) => (b.event_id > a.event_id ? 1 : -1))
          .map((d) => d.event_id)
      );
    } else if (this.selected === 2) {
      this.x.domain(
        this.data
          .sort((a, b) => (a.event_count > b.event_count ? 1 : -1))
          .map((d) => d.event_id)
      );
    } else {
      this.x.domain(
        this.data
          .sort((a, b) => (b.event_count > a.event_count ? 1 : -1))
          .map((d) => d.event_id)
      );
    }

    this.svg.transition().duration(750);

    this.svg
      .selectAll('rect')
      .data(this.data, (d: { event_id: any }) => d.event_id)
      .order()
      .transition()
      .duration(750)
      .delay((d: any, i: number) => i * 50)
      .attr('x', (d: { event_id: any }) => this.x(d.event_id));

    this.gx
      .transition()
      .duration(750)
      .call(this.xAxis)
      .selectAll('.tick')
      .delay((d: any, i: number) => i * 50);
  }

  private drawBars(data: any[]): void {
    this.x = d3
      .scaleBand()
      .domain(data.map((d) => d.event_id))
      .range([this.marginLeft, this.width - this.marginRight])
      .padding(0.2);

    this.xAxis = d3.axisBottom(this.x).tickSizeOuter(0);

    this.y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.event_count)])
      .nice()
      .range([this.height - this.marginBottom, this.marginTop]);

    this.svg.append('g').call(d3.axisLeft(this.y));

    this.svg
      .append('g')
      .attr('viewBox', [0, 0, this.width, this.height])
      .attr(
        'style',
        `max-width: ${this.width}px; height:auto; font: 10px sans-serif; overflow: visible;`
      );

    // Create a bar for each event based on ID.
    this.svg
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .style('mix-blend-mode', 'multiply') // Darker color when bars overlap during the transition.
      .attr('x', (d: any) => this.x(d.event_id))
      .attr('y', (d: any) => this.y(d.event_count))
      .attr('tooltip', (d: any) => {
        d.event_name;
      })
      .attr('width', this.x.bandwidth())
      .attr('height', (d: any) => this.y(0) - this.y(d.event_count))
      .on('mouseover', (event: any, d: any) => {
        const [x, y] = d3.pointer(event);
        let features = d.event_name;

        this.showTooltip(x, this.y(d.event_count), features);
        // this.showRandomNumbers(this.stateName);
      })
      .on('mouseout', () => this.hideTooltip());

    this.gx = this.svg
      .append('g')
      .attr('transform', `translate(0, ${this.height - this.marginBottom})`)
      .call(this.xAxis);

    this.gy = this.svg
      .append('g')
      .attr('transform', `translate(${this.marginLeft}, 0)`)
      .call(d3.axisLeft(this.y).tickFormat((y: any) => y.toFixed()))
      .call((g: any) => g.select('.domain').remove());
  }

  // To hide tooltip
  hideTooltip() {
    const tooltip = d3.select('.tooltip');
    tooltip.style('opacity', 0).style('visibility', 'hidden');
  }

  // To show tooltip
  showTooltip(x: number, y: number, text: string) {
    const toolTip = d3.select('.tooltip');
    console.log(text);
    toolTip
      .text(text)
      .style('left', x + 'px')
      .style('top', y + 'px')
      .style('opacity', 1)
      .style('visibility', 'visible');
  }
}