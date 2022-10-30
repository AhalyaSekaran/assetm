import { DialogServicesService } from './../../../services/dialog-services.service';
import { AddUsersComponent } from './../add-users/add-users.component';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/dto/employeeDto';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  adminDetails: any;

  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
  if(event.key=='ā')
  {
   this.addUser();

  }


  }

  page:number=1;
  count:number=10;
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  constructor(private userService:EmployeeServiceService,private _router:Router,private dialog:MatDialog,private toast:NgToastService,private dialogService:DialogServicesService) {


    this.userService.getAllUsers() .subscribe(data=>{
      this.sortedData=data;
    });

   }
  usersList!:EmployeeDto[];
  searchTerm!: string;

  public displayedColumns = ['empId', 'Name', 'Mail', 'Phone', 'Role', 'Status'];
  sortedData!: EmployeeDto[];

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe((data) => {
        this.usersList = data;
       console.table(data)
      })
      this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')
  }
/*  */
deleteEmp(empId:string){

this.dialogService.openConfirmDialog("Are you sure to delete this employee ?").afterClosed().subscribe(res=>{
  if(res){
    this.userService.deleteEmp(empId).subscribe(data=>{
      this.toast.success({detail:"Success",duration:3000,summary:"Employee  Deletd SuccessFully"});
      this.reloadCurrentRoute();
    })
  }
  
});

}
  /*  */
  addUser(){
    this.dialog.open(AddUsersComponent)
  }

  fClick(search:string)
  {
    this.searchTerm=search;
  }
  inactive()
  {
    this.userService.getAllInActiveUsers().subscribe(data=>
      {
        this.sortedData=data;
      })
  }
  activeUSers()
  {
    this.reloadCurrentRoute();
  }

  /* Reload Route Method */
  reloadCurrentRoute() {
    let currentUrl = this._router.url;
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
        //console.log(currentUrl);
    });
  }



  sortData(sort: Sort) {
    //console.log(sort)
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'empId':
          return compare(a.empId, b.empId, isAsc);
        case 'Name':
          return compare(a.firstName, b.firstName, isAsc);
        case 'Mail':
          return compare(a.mail, b.mail, isAsc);
        case 'Phone':
          return compare(a.mobile, b.mobile, isAsc);
        case 'Designation':
          return compare(a.designation, b.designation, isAsc);
          case 'Status':
            return compare(a.status, b.status, isAsc);
          case 'Location':
            return compare(a.location, b.location, isAsc);
          case 'Department':
              return compare(a.department, b.department, isAsc);
        default:
          return 0;
      }
    });
  }
  openUser(empId:string)
  {
    //console.log(empId);
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


