import {  NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/authendication/auth.service';
import { LoginDto } from './../../../dto/loginDto';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators ,FormBuilder } from '@angular/forms';
import { EmployeeDto } from '../../../dto/employeeDto';
import { EmployeeServiceService } from '../../../services/employee-service.service';
import { AdminDto } from '../../../dto/adminDto';
import { PasswordStrengthValidator } from '../register/password-validator';
import { ResetPassword } from 'src/app/dto/passwordResetDTO';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emp:AdminDto=new AdminDto();
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key=='Enter')
      this.login();

  }
  @ViewChild('stepper')
  private myStepper!: MatStepper;
  constructor(private empService:EmployeeServiceService,private auth:AuthService,private router:Router,public toast:NgToastService ,private _formBuilder: FormBuilder) { }
  loginData:LoginDto=new LoginDto();
  adminId!:string;
  resetPassword:ResetPassword=new ResetPassword();
  adminDetails!:any;
  details!:any;
  otPas!:string;
  isOk!:boolean;
  VerifyPasswd!:string;
  firstFormGroup: any;
  secondFormGroup:any;
  registerGroup:any;
  loginGroup:any;
  thirdFormGroup!:any;
  empIdGroup:any;

  ngOnInit() {

    this.loginGroup = new FormGroup({
      "empId": new FormControl(null, [Validators.required, Validators.pattern('[V]{1}[0-9]{5}')]),
      "password": new FormControl(null, [Validators.required])
    });

    this.empIdGroup = new FormGroup({
      "empId2": new FormControl(null, [Validators.required, Validators.pattern('[V]{1}[0-9]{5}')])
    });

    this.secondFormGroup=new FormGroup({
      "otPas": new FormControl(null, [Validators.required, Validators.pattern('@"^[a-zA-Z0-9]{8}$"')])
    })
    this.thirdFormGroup= new FormGroup({
      "password2": new FormControl(null, [PasswordStrengthValidator])
    });

    if(sessionStorage.getItem('login')=='true'){
      this.router.navigateByUrl("/dashboard")
    }
  }
  get empId() { return this.loginGroup.get('empId'); }
  get empId2() { return this.empIdGroup.get('empId2'); }
  get password() { return this.loginGroup.get('password'); }
  get password2() { return this.thirdFormGroup.get('password2'); }

logedIn=false;
  login(){
    this.logedIn=true;
if(this.loginGroup.valid){
  this.auth.isLogedIn(this.loginData).subscribe(data=>
    {
      sessionStorage.setItem('token',data.token);
      sessionStorage.setItem('login','true');
      this.toast.success({detail:"Loged in",summary:'Successfully Loged In ',duration:5000})
      sessionStorage.setItem('AdminPayload',atob(data.token.split(".")[1]));
    },error=>{
      this.toast.error({detail:"Loged Failed",summary:'invalid credentials ',duration:5000})
    });
}
else{
  return this.loginGroup;
}
  }
  forgetClass='beforeForgetClass'
  afterForget='none';
forgetPassword(){
  this.forgetClass='forgetClass'
  this.afterForget='hidden';

}
backLogin(){
  this.forgetClass='beforeForgetClass'
  this.afterForget='none';
}
  isDisable=false;
findAdmin(){
  if(this.empIdGroup.valid){
    this.toast.info({detail:"Please Wait a while",summary:'Mail sending is in Progress',duration:5000})
    this.isDisable=true;

    this.empService.getEmpByIdForAdminForForget(this.adminId).subscribe(data=>{
      this.emp=data;
      this.toast.success({detail:"OTP",summary:'Successfully sened to mail ',duration:5000})
      this.myStepper.next();
  },error=>{
    this.toast.error({detail:"Opps !😥 ",duration:3500,summary:error.error})
    this.reloadCurrentRoute();
  })
  }else{
    return this.empIdGroup
  }


  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  goback(){
    this.myStepper.previous();
  }


  isOtpMatched=true;
  findAdminByOTP(){

         this.empService.getEmpByIdForAdminForForgetByOtp(this.adminId,this.otPas).subscribe(data=>{
      this.emp=data;
      this.toast.success({detail:"OTP",summary:'Matched ',duration:5000})
      this.myStepper.next();
  },error=>{
    this.toast.error({detail:"Opps !😥 ",duration:3500,summary:error.error})
    this.reloadCurrentRoute();
  })


  }
  Comp(){
   if(this.thirdFormGroup.valid){
    console.log("If");

    this.resetPassword.password=this.VerifyPasswd;
    this.empService.updateAdminPAssword(this.adminId,this.otPas,this.resetPassword).subscribe(data=>{
      this.toast.success({detail:"Updated",summary:'Successfully Updated Password ',duration:5000})
      window.location.reload();
        },error=>{
          this.toast.error({detail:"ooooo",summary:'not Updated Password ',duration:5000})
          alert(error.status +"from error")
        }
      );
   }
   else{
    console.log("else");
    console.log(this.thirdFormGroup);


    return this.thirdFormGroup;
   }



}
}

