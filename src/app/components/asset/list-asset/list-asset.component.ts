import { DialogServicesService } from './../../../services/dialog-services.service';
import { NgToastService } from 'ng-angular-popup';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { assetsDTO } from '../../../dto/assetsDTO';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AddAssetComponent } from '../../assets/add-asset/add-asset.component';
import { UpdateAssetComponent } from '../update-asset/update-asset.component';
import { ViewAssetComponent } from '../view-asset/view-asset.component';

@Component({
  selector: 'app-list-asset',
  templateUrl: './list-asset.component.html',
  styleUrls: ['./list-asset.component.css']
})
export class ListAssetComponent implements OnInit {
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  page: number = 1;
  count: number = 10;
  adminDetails: any;



  constructor(private assetService:AssetService,private router:Router,private dialog:MatDialog,private toast:NgToastService,private dialogService:DialogServicesService) { }
  listOfAssets!:assetsDTO[];


  ngOnInit() {
    this.assetService.getAssets()
      .subscribe((data) => {
        this.listOfAssets = data;
        console.log(data)
      })

      this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')
  }

  returnAsset(serialNumber:string,empId:string){
  
    this.dialogService.openConfirmDialog("Are you sure want to return this asset ?").afterClosed().subscribe(res=>{
      if(res){
        this.assetService.returnAsset(serialNumber,empId).subscribe(data=>{
          this.toast.success({detail:"Success",duration:1500,summary:"Asset Returned Succesfully"})
          this.reloadComponent();
         },error=>{
          this.toast.error({detail:"Oops",duration:1500,summary:"Error while returning a asset"})
           this.reloadComponent();
         });
      }
    })
  }

  addAsset()
  {
    this.dialog.open(AddAssetComponent)
  }
  viewAsset(assetView:assetsDTO){
 

    const viewRef=this.dialog.open(ViewAssetComponent,{

      data:assetView
    })

  }
  updateAsset(asset:assetsDTO){
    const dialogRef= this.dialog.open(UpdateAssetComponent,{
      height:'90%',
      width:'40%',
      data:asset
    })
  }
  deleteAsset(assetId:number){
    //console.log(assetId);
    this.dialogService.openConfirmDialog("Are you sure to move this asste to Scrap ?").afterClosed().subscribe(res=>{
      if(res){
        this.assetService.deleteAssetById(assetId)
        .subscribe(resDate=>{
          this.reloadComponent();
        });
      }
    })
    

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
