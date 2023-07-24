import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {DATA} from './data';
import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-revenue',
  templateUrl: './stacked-revenue.component.html',
  styleUrls: ['./stacked-revenue.component.scss']
})
export class StackedRevenueComponent implements OnInit{
  colors = new Map([["LP/EP", "#2A5784"], ["Vinyl Single", "#43719F"], ["8 - Track", "#5B8DB8"], ["Cassette", "#7AAAD0"], ["Cassette Single", "#9BC7E4"], ["Other Tapes", "#BADDF1"], ["Kiosk", "#E1575A"], ["CD", "#EE7423"], ["CD Single", "#F59D3D"], ["SACD", "#FFC686"], ["DVD Audio", "#9D7760"], ["Music Video (Physical)", "#F1CF63"], ["Download Album", "#7C4D79"], ["Download Single", "#9B6A97"], ["Ringtones & Ringbacks", "#BE89AC"], ["Download Music Video", "#D5A5C4"], ["Other Digital", "#EFC9E6"], ["Synchronization", "#BBB1AC"], ["Paid Subscription", "#24693D"], ["On-Demand Streaming (Ad-Supported)", "#398949"], ["Other Ad-Supported Streaming", "#61AA57"], ["SoundExchange Distributions", "#7DC470"], ["Limited Tier Paid Subscription", "#B4E0A7"]]);
  data = DATA;
  width = 900;
  height = 500;
  marginTop = 20;
  marginRight = 30;
  marginBottom = 30;
  marginLeft = 30;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { 
  console.log(this.data);
  }
    
}
