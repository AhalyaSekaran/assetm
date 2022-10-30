import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AssetService } from 'src/app/services/asset.service';
import { assetsDTO } from 'src/app/dto/assetsDTO';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogedInUser } from 'src/app/dto/LogedInUser';
import { AssetNameDTO } from 'src/app/dto/assetNameDto';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
  maxDate: any;
  minDate:any;
  newAssetGroup: any;
  adminDetails:LogedInUser= new LogedInUser();
  newAsset:assetsDTO=new assetsDTO();
  assetNames!:AssetNameDTO[];
  osDisable!:boolean;
  constructor(private assetService:AssetService,private toast:NgToastService,private router:Router,private dialogRef:MatDialogRef<AddAssetComponent>) { }

  asset:assetsDTO=new assetsDTO();
  ngOnInit() {
    this.assetService.getAssetNameList().subscribe((data)=>this.assetNames=data);
    this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')

    this.newAssetGroup = new FormGroup({
      "assetName": new FormControl(null, [Validators.required]),
      "serialNumber": new FormControl(null, [Validators.required]),
      "location": new FormControl(null, [Validators.required]),
      "purchaseDate": new FormControl(null, [Validators.required]),
      "warrantyDate":new FormControl(null,[Validators.required,]),
      "modelName":new FormControl(null,[Validators.required,]),


    })

    this.modifyDate();
  }
  get assetName() { return this.newAssetGroup.get('assetName'); }
  get serialNumber() { return this.newAssetGroup.get('serialNumber'); }
  get location() { return this.newAssetGroup.get('location'); }
  get purchaseDate() { return this.newAssetGroup.get('purchaseDate'); }
  get warrantyDate() { return this.newAssetGroup.get('warrantyDate'); }
  get modelName() { return this.newAssetGroup.get('modelName'); }

  submitted = false;
  addAsset()
  {
    this.submitted=true;

    if(this.newAssetGroup.valid){
      if(this.newAsset.assetName!='laptop'|| this.newAsset.assetName!='laptop'){
        this.newAsset.operatingSystem="";
      }

      this.newAsset.addedBy=this.adminDetails.adminName;
      this.assetService.saveAssets(this.newAsset).subscribe(data=>{
        this.toast.success({detail:"Success",duration:3000,summary:"Asset Added SuccessFully"});
        this.dialogRef.close();
        this.dialogRef.afterClosed().subscribe(item=>{
          this.reloadCurrentRoute();
        })
      },error=>{
        this.toast.error({detail:"Oops",duration:3000,summary:"Failed to added Asset"});
      })
    }
    else{
      return this.newAssetGroup;
    }
  }


  /* Checking Condition for disable os Selection */
  modifyDate(){
    var date:any=new Date();
    var todayDate:any=date.getDate();
    var month:any=date.getMonth()+1;
    var year:any=date.getFullYear();
    if(todayDate<10){
     todayDate='0'+todayDate;
    }
    if(month<10){
      month='0'+month;
    }
    this.maxDate=year+"-"+month+"-"+todayDate;
    this.minDate=year+"-"+month+"-"+todayDate;
  }

  checkDisable(){
    console.log(this.newAsset.assetName);
   if(this.newAsset!=undefined){
    if(this.newAsset.assetName=='LAPTOP' || this.newAsset.assetName=='laptop'){
      return false;
    }else
    {
      return true;
    }
   }
   return false;
  }

/*  */

  /* To Reload the Current Component */
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
