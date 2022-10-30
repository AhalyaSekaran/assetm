import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AssetService } from 'src/app/services/asset.service';
import { assignDTO } from './../../../dto/assignDTO';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { assetsDTO } from 'src/app/dto/assetsDTO';
import { assignAssetDTO } from 'src/app/dto/assignAssetDTO';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-assign-asset',
  templateUrl: './assign-asset.component.html',
  styleUrls: ['./assign-asset.component.css']
})
export class AssignAssetComponent implements OnInit {
  adminDetails: any;

  constructor(private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public assetData: assignAssetDTO,private assetService:AssetService,private toast:NgToastService,private router:Router,private dialogRef:MatDialogRef<AssignAssetComponent>) { }
  assigendDate!:string;
  assignable:assignAssetDTO=new assignAssetDTO()

  ngOnInit(): void {
    this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')
    //console.log(this.adminDetails);
    this.assetData.assignedBy=this.adminDetails.adminName;
  }
assign(){
  this.assetService.assignAsset(this.assetData).subscribe(data=>{
    console.log(data);
    
    this.toast.success({detail:"Success",duration:3000,summary:"Asset Assigned SuccessFully"});
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(item=>{
      this.reloadCurrentRoute();
    })
  },error=>{
    console.log(error);
    
    this.toast.error({detail:"Oops",duration:3000,summary:"User Not Found"});

  })

}
cancel(){
      this.dialog.closeAll();
}

  /* To Reload the Current Component */
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
