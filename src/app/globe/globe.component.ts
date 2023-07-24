import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent implements OnInit{
  @ViewChild('globeContainer', {static: true}) globeContainer!: ElementRef<HTMLDivElement>;
  data: any;
  svg: any;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    d3.json('assets/world-110m2.json').then((res) => {this.data = res; this.createGlobe();})
  }
  createGlobe() {
    const container = this.globeContainer.nativeElement;
    const width = container.offsetWidth;
    const height = 600;

    // rotation function which uses d3 projection, rotate & speed
    const rotateGlobe = () => {
      const currentRotation = projection.rotate();
      const speed = 0.1;

      projection.rotate([currentRotation[0] - speed, currentRotation[1]]);
      this.svg.selectAll('.land').attr('d', path as any);
    }

    this.svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    const projection = d3.geoOrthographic()
    .scale(300)
    .translate([width/2, height/2]);

    // projecting globe by giving geoJson data
    const path = d3.geoPath().projection(projection);

    // to show ocean as graticule - a network of lines representing 
    // meridians and parallels, on which a map or plan can be represented
    this.svg.append('path')
    .datum(d3.geoGraticule())
    .attr('class', 'graticule')
    .attr('fill', 'blue')
    .attr('d', path)

    // to show lands
    this.svg.append('path')
    .datum(topojson.feature(this.data, this.data.objects.land))
    .attr('class', 'land')
    // .attr('stroke', 'black')
    .attr('fill', 'lightgreen')
    .attr('d', path);

    const drag = d3.drag()
    .on('drag', (event) => {
      const rotate = projection.rotate();
      const lambda = rotate[0] + (event.dx/2);
      const pi = rotate[1] - (event.dy/2);

      projection.rotate([lambda, pi]);

      path.projection(projection);
      
      this.svg.selectAll('.land').attr('d', path as any);
      // commenting this cuz not working properly
      // this.svg.selectAll('.graticule').attr('d', path as any);
    });

    this.svg.call(drag as any);
    d3.timer(rotateGlobe);
  }
}
