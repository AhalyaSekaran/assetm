import { Observable } from 'rxjs';
import { RegisterComponent } from './../register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddAssetNameComponent } from '../../asset/add-asset-name/add-asset-name.component';
import { EmployeeDto } from 'src/app/dto/employeeDto';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  adminDetails: any;
  
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
    this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')

  }
addAdmin(){
  this.dialog.open(RegisterComponent)
}

addAssetName(){
  this.dialog.open(AddAssetNameComponent)
}
}
