import { epmIdDto } from './../dto/empIdDto';
import { EmployeeDto } from 'src/app/dto/employeeDto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminDto } from '../dto/adminDto';
import { ResetPassword } from '../dto/passwordResetDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  baseUrl:string;
  constructor(private  http:HttpClient) {
    this.baseUrl=environment.baseUrl;
   }
  getAllUsers():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/employee/employeelist`);
  }
  getAllInActiveUsers():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/employee/status/inactive`)
  }
  saveEmployee(employee:EmployeeDto):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/employee/saveemployee`,employee)
  }
  deleteEmp(empId:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/deleteEmp/`+empId)
  }
  getEmpById(empId:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getEmployee/`+empId)
  }
  getEmpByIdForAdmin(empId:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/employee/get/for/admin/`+empId)
  }

  getEmpByIdForAdminForForget(empId:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/admin/get/otp/`+empId,{headers:{skip:"true"}})
  }
  getEmpByIdForAdminForForgetByOtp(empId:string,otp:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/admin/get/validate/otp/`+empId+`/`+otp,{headers:{skip:"true"}})
  }
  updateAdminPAssword(empId:string,otp:string,admin:ResetPassword):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/admin/update/password/`+empId+`/`+otp,admin,{headers:{skip:"true"}})
  }
}
