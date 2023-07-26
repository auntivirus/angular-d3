import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {zoom, zoomIdentity} from 'd3-zoom';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit{
  @ViewChild('mapContainer', {static: true}) mapContainer!: ElementRef<HTMLDivElement>;
  data: any;
  svg: any;
  zoomBehaviour: any;
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
      this.http.get<any>('assets/world-countries.geojson')
      .subscribe((res) => { this.data = res; this.drawWorldMap(); });
  }

  drawWorldMap() {
    const container = this.mapContainer.nativeElement;
    const width = container.offsetWidth;
    const height = container.clientHeight;

    this.zoomBehaviour = zoom()
    .scaleExtent([1,8])
    .on('zoom', (event) => this.handleZoom(event));

    this.svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('style', "background-color: lightblue")
    .call(this.zoomBehaviour)
    ;

    this.svg.call(this.zoomBehaviour.transform, zoomIdentity);

      const projection = d3.geoMercator()
      .fitSize([width, height], this.data)
      .translate([width/2, height/2])
      // .scale(300)
      ;
      
      const path: any = d3.geoPath().projection(projection);
      
      this.svg.selectAll('path')
      .data(this.data.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', 'black')
      .attr('fill', 'lightgreen')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event: any, d: any) => {
        const [x,y] = d3.pointer(event);
        const countryName = d.properties.name;
        this.showTooltip(x,y,countryName);
      })
      .on('mouseout', () => this.hideTooltip());
  }
  
  handleZoom(event: any) {
    const transform  = event.transform;
    this.svg.selectAll('path')
    .transition()
    .duration(50)
    .attr('transform', transform)
    ;
  }

  showTooltip(x: number, y: number, text: string) {
    const toolTip = d3.select('.tooltip');
    const container = this.mapContainer.nativeElement;

    toolTip.text(text)
      .style('left',x+'px')
      .style('top',y+'px')
      .style('opacity', 1)
      .style('visibility', 'visible');
  }
  hideTooltip() {
    const tooltip = d3.select('.tooltip');
    tooltip.style('opacity', 0)
      .style('visibility', 'hidden');
  }
  
}
