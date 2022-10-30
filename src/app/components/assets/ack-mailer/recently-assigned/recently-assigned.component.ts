import { Router } from '@angular/router';
import { AssetService } from 'src/app/services/asset.service';
import { EmployeeDto } from 'src/app/dto/employeeDto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recently-assigned',
  templateUrl: './recently-assigned.component.html',
  styleUrls: ['./recently-assigned.component.css']
})
export class RecentlyAssignedComponent implements OnInit {

  constructor(private assetService:AssetService,private router:Router) { }
  recentAssignedEmps!:EmployeeDto[];

  ngOnInit(): void {
    this.assetService.getRecentAssigned().subscribe(data=>{
this.recentAssignedEmps=data;
    },error=>{

    })
  }
  ackmail(empId:String){
    this.router.navigate(['/services/recently/assigned-list/mail-sender/'+empId])
  }

}
