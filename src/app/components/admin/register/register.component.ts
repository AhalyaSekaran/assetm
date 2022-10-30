import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { RegisterService } from './../../../services/register.service';
import { AdminDto } from './../../../dto/adminDto';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordStrengthValidator } from './password-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
newAdmin:any;
  constructor(private adminService:RegisterService,private router:Router,private toast:NgToastService,private dialogRef:MatDialogRef<RegisterComponent>) { }
  register:AdminDto=new AdminDto();
  fullName!:string;
  confirmPasswd!:string;




  ngOnInit(): void {
    // Validators.pattern('[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
    /* Pattern Validations  */
  this.newAdmin = new FormGroup({
    "empId": new FormControl(null, [Validators.required, Validators.pattern('')]),
    "name": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]*')]),
    "email":new FormControl(null,[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]),
    "location": new FormControl(null, [Validators.required]),
    "password": new FormControl(null, [Validators.required,PasswordStrengthValidator]),
    "confirmPassword":new FormControl(null,[Validators.required]),
    // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])$')
  },
  );

  }
  get name() { return this.newAdmin.get('name'); }
  get empId() { return this.newAdmin.get('empId'); }
  get email() { return this.newAdmin.get('email'); }
  get location() { return this.newAdmin.get('location'); }
  get password() { return this.newAdmin.get('password'); }
  get confirmPassword() { return this.newAdmin.get('confirmPassword'); }
  submitted = false;
/* for adding new admin */
  addAdmin(){
    this.submitted=true;
  this.register.firstName=this.fullName.split(" ")[0];
  this.register.lastName=this.fullName.split(" ")[1];
  if(this.newAdmin.valid){

    this.adminService.registerAdmin(this.register).subscribe(data=>{

      },error=>{
        this.toast.success({detail:"Success",duration:3000,summary:"Admin Added SuccessFully"});
      this.dialogRef.close();
      this.dialogRef.afterClosed().subscribe(d=>{
        this.reloadCurrentRoute()
      });
    })
   }else{
    return this.newAdmin;
   }

  }



  /* To Reload the Current Component */
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
