/*
=====================================================
; File Name: base-layout.component.ts
; Author: Ace Baugh
; Date: 06/25/2023
; File Description: This is the typeScript file for the base layout component
=====================================================
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent {
  colorLetterW1: string = '#BD80FF';
  colorLetterD: string = '#BD80FF';
  colorLetterW2: string = '#BD80FF';
  colorStar: string = '#FFEA80';
  colorStarStroke: string = '#BD80FF';
  colorLetterS: string = '#BD80FF';
  colorLetterH: string = '#BD80FF';
  colorLetterI: string = '#BD80FF';
  colorLetterFBot: string = '#BD80FF';
  colorLetterFTop: string = '#BD80FF';
  colorLetterTBot: string = '#BD80FF';
  colorLetterTTop: string = '#BD80FF';
  colorLetterXBot: string = '#BD80FF';
  colorLetterXTop: string = '#BD80FF';
  colorStreak: string = '#BD80FF';
  todaysDate: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Valentine's Day
    if (this.todaysDate.getDate() === 14 && this.todaysDate.getMonth() === 1) {
      this.valentines();
    }
    // St. Patrick's Day
    if (this.todaysDate.getDate() === 17 && this.todaysDate.getMonth() === 2) {
      this.stPatty();
    }
    // Christmas Time
    if (this.todaysDate.getDate() === 25 && this.todaysDate.getMonth() === 11) {
      this.xMas();
    }
    // Independence Day
    if (this.todaysDate.getDate() === 4 && this.todaysDate.getMonth() === 6) {
      this.flag();
    }
    // Halloween
    if (this.todaysDate.getDate() === 31 && this.todaysDate.getMonth() === 9) {
      this.halloween();
    }
    // Earth Day
    if (this.todaysDate.getDate() === 22 && this.todaysDate.getMonth() === 3) {
      this.earthDay();
    }
    // Flag Day
    if (this.todaysDate.getDate() === 14 && this.todaysDate.getMonth() === 5) {
      this.flag();
    }
    // Patriot Day
    if (this.todaysDate.getDate() === 11 && this.todaysDate.getMonth() === 8) {
      this.flag();
    }
    // Hanukkah
    if (this.todaysDate.getDate() === 10 && this.todaysDate.getMonth() === 11) {
      this.hanukkah();
    }
    // Mickey's Birthday
    if (this.todaysDate.getDate() === 18 && this.todaysDate.getMonth() === 10) {
      this.mickey();
    }
    // Thanksgiving
    if (this.todaysDate.getDay() === 4 && this.todaysDate.getMonth() === 10) {
      if (this.todaysDate.getDate() >= 22 && this.todaysDate.getDate() <= 28) {
        this.thanksgiving();
      }
    }
    // Memorial Day
    if (this.todaysDate.getDay() === 1 && this.todaysDate.getMonth() === 4) {
      if (this.todaysDate.getDate() >= 25 && this.todaysDate.getDate() <= 31) {
        this.flag();
      }
    }
  }

  valentines() {
    this.colorLetterW1 = '#E10180';
    this.colorLetterD = '#F4B4CE';
    this.colorLetterW2 = '#EE78B5';
    this.colorStar = '#EA3E9A';
    this.colorStreak = '#EA3E9A';
    this.colorLetterS = '#E10180';
    this.colorLetterH = '#F4B4CE';
    this.colorLetterI = '#EE78B5';
    this.colorLetterFBot = '#E10180';
    this.colorLetterFTop = '#E10180';
    this.colorLetterTBot = '#F4B4CE';
    this.colorLetterTTop = '#F4B4CE';
    this.colorLetterXBot = '#EE78B5';
    this.colorLetterXTop = '#EE78B5';
  }

  stPatty() {
    this.colorLetterW1 = '#019847';
    this.colorLetterD = '#FDFDFD';
    this.colorLetterW2 = '#FD7801';
    this.colorStar = 'gold';
    this.colorStreak = 'gold';
    this.colorLetterS = '#019847';
    this.colorLetterH = '#FDFDFD';
    this.colorLetterI = '#FD7801';
    this.colorLetterFBot = '#019847';
    this.colorLetterFTop = '#019847';
    this.colorLetterTBot = '#FDFDFD';
    this.colorLetterTTop = '#FDFDFD';
    this.colorLetterXBot = '#FD7801';
    this.colorLetterXTop = '#FD7801';
  }
  xMas() {
    this.colorLetterW1 = 'red';
    this.colorLetterD = 'green';
    this.colorLetterW2 = 'red';
    this.colorStar = 'gold';
    this.colorStreak = 'url(#xmas)';
    this.colorLetterS = 'red';
    this.colorLetterH = 'green';
    this.colorLetterI = 'red';
    this.colorLetterFBot = 'green';
    this.colorLetterFTop = 'green';
    this.colorLetterTBot = 'red';
    this.colorLetterTTop = 'red';
    this.colorLetterXBot = 'green';
    this.colorLetterXTop = 'green';
  }

  earthDay() {
    this.colorLetterW1 = '#56A5D2';
    this.colorLetterD = '#78B843';
    this.colorLetterW2 = '#56A5D2';
    this.colorStar = 'gold';
    this.colorStreak = 'gold';
    this.colorLetterS = '#56A5D2';
    this.colorLetterH = '#78B843';
    this.colorLetterI = '#56A5D2';
    this.colorLetterFBot = '#78B843';
    this.colorLetterFTop = '#78B843';
    this.colorLetterTBot = '#56A5D2';
    this.colorLetterTTop = '#56A5D2';
    this.colorLetterXBot = '#78B843';
    this.colorLetterXTop = '#78B843';
  }

  flag() {
    this.colorLetterW1 = 'blue';
    this.colorLetterD = 'blue';
    this.colorLetterW2 = 'blue';
    this.colorStar = 'gold';
    this.colorStreak = 'gold';
    this.colorLetterS = 'url(#fourth)';
    this.colorLetterH = 'url(#fourth)';
    this.colorLetterI = 'url(#fourth)';
    this.colorLetterFBot = 'url(#fourth)';
    this.colorLetterFTop = 'url(#fourth)';
    this.colorLetterTBot = 'url(#fourth)';
    this.colorLetterTTop = 'url(#fourth)';
    this.colorLetterXBot = 'url(#fourth)';
    this.colorLetterXTop = 'url(#fourth)';
  }

  halloween() {
    this.colorLetterW1 = '#EB6123';
    this.colorLetterD = '#18181A';
    this.colorLetterW2 = '#5E32BA';
    this.colorStar = '#BFDA7A';
    this.colorStreak = '#96C457';
    this.colorLetterS = '#EB6123';
    this.colorLetterH = '#18181A';
    this.colorLetterI = '#5E32BA';
    this.colorLetterFBot = '#EB6123';
    this.colorLetterFTop = '#EB6123';
    this.colorLetterTBot = '#18181A';
    this.colorLetterTTop = '#18181A';
    this.colorLetterXBot = '#5E32BA';
    this.colorLetterXTop = '#5E32BA';
  }

  mickey() {
    this.colorLetterW1 = 'red';
    this.colorLetterD = 'black';
    this.colorLetterW2 = 'red';
    this.colorStar = '#FEF200';
    this.colorStreak = '#FEF200';
    this.colorLetterS = 'url(#mickey)';
    this.colorLetterH = 'url(#mickey)';
    this.colorLetterI = 'url(#mickey)';
    this.colorLetterFBot = 'red';
    this.colorLetterFTop = 'black';
    this.colorLetterTBot = 'red';
    this.colorLetterTTop = 'black';
    this.colorLetterXBot = 'red';
    this.colorLetterXTop = 'black';
  }

  thanksgiving() {
    this.colorLetterW1 = '#382615';
    this.colorLetterD = '#ED732E';
    this.colorLetterW2 = '#9D221E';
    this.colorStar = '#F8B12C';
    this.colorStreak = '#859D3C';
    this.colorLetterS = '#382615';
    this.colorLetterH = '#ED732E';
    this.colorLetterI = '#9D221E';
    this.colorLetterFBot = '#382615';
    this.colorLetterFTop = '#382615';
    this.colorLetterTBot = '#ED732E';
    this.colorLetterTTop = '#ED732E';
    this.colorLetterXBot = '#9D221E';
    this.colorLetterXTop = '#9D221E';
  }

  hanukkah() {
    this.colorLetterW1 = 'blue';
    this.colorLetterD = 'white';
    this.colorLetterW2 = 'blue';
    this.colorStar = 'gold';
    this.colorStreak = 'red';
    this.colorLetterS = 'blue';
    this.colorLetterH = 'white';
    this.colorLetterI = 'blue';
    this.colorLetterFBot = 'blue';
    this.colorLetterFTop = 'blue';
    this.colorLetterTBot = 'white';
    this.colorLetterTTop = 'white';
    this.colorLetterXBot = 'blue';
    this.colorLetterXTop = 'blue';
  }

  // Function to find out if today is the last Monday of May
  // aka Memorial Day
  // isMemorial(this.todaysDate) {
  //   if (d.getMonth() + 1 != 5 || d.getDay() != 1) {
  //     return false;
  //   } else if (
  //     d.getDate() == 25 ||
  //     d.getDate() == 26 ||
  //     d.getDate() == 27 ||
  //     d.getDate() == 28 ||
  //     d.getDate() == 28 ||
  //     d.getDate() == 30 ||
  //     d.getDate() == 31
  //   ) {
  //     return true;
  //   }
  // }
}
