import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  faqOpen: boolean[] = [];

  constructor() {
    this.initializeFAQ();
  }

  initializeFAQ() {
    for (let i = 1; i <= 5; i++) {
      this.faqOpen[i] = false;
    }
  }

  toggleFAQ(index: number) {
    this.faqOpen[index] = !this.faqOpen[index];
  }
}
