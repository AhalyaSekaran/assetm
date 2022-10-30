import { RegisterService } from './../../../services/register.service';
import { AdminDto } from './../../../dto/adminDto';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';
import { EmployeeDto } from './../../../dto/employeeDto';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { PasswordStrengthValidator } from './password-validator';
import { Router } from '@angular/router';
import { epmIdDto } from 'src/app/dto/empIdDto';



@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
})
export class AddAdminComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,private empService:EmployeeServiceService,private toast:NgToastService,private router:Router,private registerService:RegisterService) {}
  loginGroup: any;
  adminId!:string;
  isOk!:boolean;
  registerGroup:any;
  confirmPasswd!:string;
  passwd!:string;
  emp:EmployeeDto=new EmployeeDto();
  admin:AdminDto=new AdminDto();
  ngOnInit(): void {
    this.registerGroup = new FormGroup({
      "password": new FormControl(null, [Validators.required,PasswordStrengthValidator]),
      "access": new FormControl(null, [Validators.required]),


    },


    );


    this.loginGroup = new FormGroup({
      "empId": new FormControl(null, [Validators.required, Validators.pattern('[V]{1}[0-9]{5}')]),
    });
  }
  get empId() { return this.loginGroup.get('empId'); }
  get confirmPassword() { return this.registerGroup.get('confirmPassword'); }
  get password() { return this.registerGroup.get('password'); }
  get access() { return this.registerGroup.get('access'); }

  submitted = false;
/* For Step Controll Group */
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });




  findEmp(){
    this.isOk=true;
    if(this.loginGroup.valid){
      console.log(this.adminId);
    this.empService.getEmpByIdForAdmin(this.adminId).subscribe(data=>{
        this.emp=data;
    },error=>{
      this.toast.error({detail:"Opps !😥 ",duration:3500,summary:error.error})
      this.reloadCurrentRoute();
    })
    }else{
      return this.loginGroup;
    }
  }
  isReg=false;
  regAdmin(){
    this.isReg=true;
    if(this.registerGroup.valid){
      this.submitted = true;
      this.admin.empId=this.emp.empId;
      this.admin.firstName=this.emp.firstName;
      this.admin.lastName=this.emp.lastName;
      this.admin.mail=this.emp.mail;
      this.admin.password=this.passwd;
      this.admin.location=this.emp.location;
      this.admin.access=this.emp.access;

      console.log(this.admin);

      this.registerService.registerAdmin(this.admin).subscribe(data=>{
        this.toast.success({detail:"Success ",duration:3500,summary:this.admin.firstName+" User Updated Successfully as Admin"})
        this.router.navigateByUrl("dashboard");
      },error=>{
        console.log(error);
        this.toast.error({detail:"Opps !  ",duration:3500,summary:error.error})
      })
    }else{
      return this.registerGroup;
    }

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
