import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faMagnifyingGlass, faHandshake } from '@fortawesome/free-solid-svg-icons';
//import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  faMagnifyingGlass = faMagnifyingGlass;
}
