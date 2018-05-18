import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Directive, Output, HostListener, asNativeElements, EventEmitter } from '@angular/core';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { NativeDateAdapter } from "@angular/material";

import { Router } from "@angular/router";
import * as moment from 'moment';
import 'moment/locale/th';

import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

const _moment = (moment as any).default ? (moment as any).default : moment;

export const MY_CUSTOM_FORMATS = {
  parseInput: 'LL LT',
  fullPickerInput: 'LL LT',
  datePickerInput: 'LL',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-readme-page',
  templateUrl: './readme-page.component.html',
  styleUrls: ['./readme-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ReadmePageComponent implements OnInit {

  today = Date.now();
  fixedTimezone = '2015-06-15T09:03:01+0700';

  dp;

  constructor(private adapter: DateAdapter<any>) { 
    // this.adapter.setLocale('th');
  }

  ngOnInit() {
    console.log(moment(new Date(), "YYYY-MM-DD HH:mm:ss Z",'th').format()); // see timezone
    console.log(moment(new Date()).format("YYYY-MM-DDTH:mm:ss "));
    console.log(moment(new Date(), "YYYY-MM-DD HH:mm:ss Z",'th').unix());
    console.log(moment(new Date(), "YYYY-MM-DD HH:mm:ss Z",'th').unix().valueOf());
    
  }

  updateDate(date){    
    this.dp = this.adapter.format(date,'input');
    var dateVal = 
      this.adapter.getYear(date) 
      + '-' + (this.adapter.getMonth(date)+1) 
      + '-'  + this.adapter.getDate(date)
      ;

    this.adapter.format(date,'input');
    console.log(dateVal);
    
  }

}
