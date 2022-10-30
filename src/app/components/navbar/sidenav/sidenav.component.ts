import { AdminDto } from './../../../dto/adminDto';
import { Component, OnInit } from '@angular/core';
import { LogedInUser } from 'src/app/dto/LogedInUser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }
  adminDetails:LogedInUser= new LogedInUser();
  panelOpenState = false;
  ngOnInit(): void {
     this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')
    //console.log(this.adminDetails);

  }

}
