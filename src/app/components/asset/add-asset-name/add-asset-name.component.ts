import { MatDialogRef } from '@angular/material/dialog';
import { AssetNameDTO } from './../../../dto/assetNameDto';
import { Component, OnInit } from '@angular/core';
import { AllServiceService } from 'src/app/services/all-service.service';
import { NgToastService } from 'ng-angular-popup';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-asset-name',
  templateUrl: './add-asset-name.component.html',
  styleUrls: ['./add-asset-name.component.css']
})
export class AddAssetNameComponent implements OnInit {
  assetName1:AssetNameDTO=new AssetNameDTO();
  assetNameGroup: any;
  constructor(private service:AllServiceService,private toast:NgToastService,private dialogRef:MatDialogRef<AddAssetNameComponent>) { }

  ngOnInit(): void {
    this.assetNameGroup = new FormGroup({
      "assetName": new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z]*$')]),})
  }
  get assetName() { return this.assetNameGroup.get('assetName'); }
  submitted=false;
  addAssetName(){
    this.submitted=true;
   if(this.assetNameGroup.valid){
    this.service.addAssetName(this.assetName1).subscribe(
      (data)=>{
        this.assetName1=data
        this.toast.success({detail:"Success",duration:3000,summary:"Asset Name Added SuccessFully"});
        this.dialogRef.close()
      }
    );
   }else{
    return this.assetNameGroup;
   }
  }

}
