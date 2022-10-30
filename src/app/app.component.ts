import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/authendication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  constructor(public authServ:AuthService){}
  loader=true;
  ngOnInit() {
    this.loader=false;
  }
  title = 'asset';
}
