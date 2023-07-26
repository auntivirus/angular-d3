import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit {
  @ViewChild('indiaContainer', {static: true}) indiaContainer!: ElementRef<HTMLDivElement>;
  data: any;
  svg: any;
  stateName: string = "";
  selectedState: any = null;
  defaultColor: string = 'white';
  selectedColor: string = 'blue';
  randomNumbers: number | null = 0;
  countByState: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('assets/india.geojson')
    .subscribe((res) => { this.data = res; this.drawIndia()} );

    this.http.get<any>('assets/count_by_state.json')
    .subscribe((res) => { this.countByState = res.count_by_state; });
  }

  // Randomly showing numbers on hover
  showRandomNumbers(state:string) {
    let flag = false;
    debugger;
    this.countByState.forEach(element => {
      if(!flag && element.state == state){
        this.randomNumbers = element.count;
        flag = true;
      }else if(!flag && element.state != state){
         this.randomNumbers = null;
      }
    });
    //this.randomNumbers = Math.floor(Math.random()*10000).toString();
  }

  drawIndia() {
    console.log(">>>>>>>>>>>>",this.countByState);
    
    const container = this.indiaContainer.nativeElement;
    const width = container.offsetWidth;
    const height = container.clientHeight;
  
    this.svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      // .attr('style', 'background-color: lightblue')
      ;
  
    const projection = d3.geoMercator()
      .fitSize([width, height], this.data);
  
    const path: any = d3.geoPath().projection(projection);
  
    this.svg.selectAll('path')
      .data(this.data.features)
      .enter()
      .append('path')
      .attr('d', path)
      .on('click', (event: any, d: any) => {
        this.handleStateClick(d);
      })
      .attr('data-name', (d: any) => d.properties.NAME_1)
      .attr('stroke', 'black')
      .attr('fill', this.defaultColor)
      .attr('stroke-width', 0.5)
      .on('mouseover', (event: any, d: any) => {
        const [x, y] = d3.pointer(event);
        let features = d.properties;
        this.stateName = features.NAME_1;
        this.showTooltip(x, y, this.stateName);
        this.showRandomNumbers(this.stateName);
        // this.showCountByState();
      })
      .on('mouseout', () => this.hideTooltip())
      ;
  
    // text inside each states
    // this.svg.selectAll('text')
    //   .data(this.data.features)
    //   .enter()
    //   .append('text')
    //   .attr('x', (d: any) => path.centroid(d)[0])
    //   .attr('y', (d: any) => path.centroid(d)[1])
    //   .attr('text-anchor', 'middle')
    //   .style('font-size', '10px')
    //   .text((d: any) => d.properties.NAME_1)
    //   // .call(this.wrapText, 100)
    //   ;
  }
  handleStateClick(d: any) {
    // debugger;
    if(this.selectedState !== d) {
      if(this.selectedState) {
        this.svg.select(`[name="${this.selectedState.properties.NAME_1}"]`)
        .attr('fill', this.defaultColor);
      }

      this.selectedState = d;
      this.svg.select(`[data-name="${d.properties.NAME_1}"]`)
      .attr('fill', this.selectedColor);
    } else {
      this.selectedState = null;
      this.svg.select(`[data-name = "${d.properties.NAME_1}"]`)
      .attr('fill', this.defaultColor);
  }
}

  showCountByState() { }

  // To wrap text
  wrapText(text: any, width: number) {
    // text.each(
    //   function (this: any) {
    //     const text = d3.select(this);
    //     const words = text.text().split(/\s+/).reverse();
    //     let word;
    //     let line: string[] = [];
    //     let lineNumber = 0;
    //     const lineHeight = 1.1; // Adjust line height as needed
    //     const y = text.attr('y');
    //     const dy = parseFloat(text.attr('dy') || '0');

    //     let tspan = text.text(null).append('tspan')
    //     .attr('x', 0)
    //     .attr('y', y)
    //     .attr('dy', dy+'em');
    //     while(word = words.pop()) {
    //       line.push(word);
    //       tspan.text(line.join(' '));
    //       if(tspan.node()!.getComputedTextLength() > width) {
    //         line.pop();
    //         tspan.text(line.join(' '));
    //         line = [word];
    //         tspan = text.append('tspan')
    //         .attr('x', 0)
    //         .attr('y', y)
    //         .attr('dy', ++lineNumber * lineHeight + dy + 'em')
    //         .text(word);
    //       }
    //     }
    //   });
  }

  // To hide tooltip
  hideTooltip() {
    const tooltip = d3.select('.tooltip');
    tooltip.style('opacity', 0)
    .style('visibility', 'hidden');
  }
  // To show tooltip
  showTooltip(x: number, y: number, text: string) {
    const toolTip = d3.select('.tooltip');

    toolTip.text(text)
      .style('left',x+'px')
      .style('top',y+'px')
      .style('opacity', 1)
      .style('visibility', 'visible');
  }
}