import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  faqQuestions = document.querySelectorAll(".faq");
  faqAnswers = document.querySelectorAll(".faq-a");
  faqIcons = document.querySelectorAll(".faq-icon");

// faqQuestions.forEach((faqQuestion, index) => {
//   faqQuestion.addEventListener('click', () => {
//     faqIcons[index].classList.toggle("expand");
//     faqAnswers[index].classList.toggle("expand");
//   });
// });

}
