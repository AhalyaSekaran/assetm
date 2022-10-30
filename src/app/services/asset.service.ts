import { AssetNameDTO } from './../dto/assetNameDto';
import { assignDTO } from './../dto/assignDTO';
import { assetsDTO } from 'src/app/dto/assetsDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  baseUrl!: string;
  token:any;

  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
    this.token=sessionStorage.getItem('token');
   }
   get Token(){
   let tokenStr='Bearer '+this.token;
   console.log(this.token.token);
   return new HttpHeaders().set("Authorization",tokenStr)
   }
  saveAssets(assets:assetsDTO)
  {
    return this.http.post(`${this.baseUrl}/asset/saveAsset`, assets);
  }

  getAssets():Observable<any>{
    return this.http.get(`${this.baseUrl}/asset/getall`);
  }
  getAssetsById(id: string):Observable<any>{
    return this.http.get(`${this.baseUrl}/asset/id/`+id);
  }
  UpdateAssets(data: assetsDTO):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/asset/update`,data);
  }
  deleteAssetById(id: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/asset/delete/`+id);
  }
  returnAsset(serialNumber:string,empId:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/asset/return/`+serialNumber+"/"+empId)
  }
  getUnassignedAsset():Observable<any>{
    return this.http.get(`${this.baseUrl}/asset/getUnassigned`);
  }
  assignAsset(assign:assignDTO):Observable<any>{
   // console.log("from service");
    //console.log(assign);
    return this.http.post(`${this.baseUrl}/admin/assignable/save`,assign)
  }
  getAssetNameList():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/assetname/getall`)
  }
  saveAssetNameList(assetName:AssetNameDTO):Observable<any>{
    return this.http.post(`${this.baseUrl}/assetname/save`,assetName);
  }
  getRecentAssigned():Observable<any>{
    return this.http.get(`${this.baseUrl}/admin/get-recent-assigned`);
  }
  getAssetsByEmpId(empId:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/admin/get/all/assigned/assets/by/`+empId)
  }
}
