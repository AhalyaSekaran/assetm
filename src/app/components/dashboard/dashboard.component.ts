import { assetCount } from './../../dto/assetCount';
import { assetsDTO } from './../../dto/assetsDTO';
import { AssetService } from './../../services/asset.service';
import { AssignAssetComponent } from './../asset/assign-asset/assign-asset.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartType } from 'angular-google-charts';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private modal:MatDialog,private assetService:AssetService,private dashService:DashboardService) { }
unAssigned!:assetsDTO[];
assetCountForAll!:assetCount[]
assetCountForChennai!:assetCount;
assetCountForPune!:assetCount;
dataForPune !: any[]
dataForChennai! : any[]
dataForTotal !: any[]
loader=true;
  ngOnInit(): void {
    this.assetService.getUnassignedAsset().subscribe(datax=>{

      this.unAssigned=datax;
      console.log(this.unAssigned);
      this.loader=false;
    },error=>{

    })
// Load Availabae Assets

this.dashService.getCountOfUnAssignedAssets().subscribe(data=>{
    this.assetCountForAll=data;
  

    this.assetCountForAll.forEach(element => {
      switch(element.location.toLowerCase()){
        case "chennai":
            this.assetCountForChennai=element
            break
        case "pune":
            this.assetCountForPune=element;
            break
      }
    });

    this.dataForPune = [
      ['Availabe', this.assetCountForPune.unAssignedLaptopCount],
      ['Stock', this.assetCountForPune.laptopCount],
      
    ];

    this.dataForChennai = [
      ['Availabe', this.assetCountForChennai.unAssignedLaptopCount],
      ['Stock', this.assetCountForChennai.laptopCount]
     
    ];

    this.dataForTotal = [
      ['Available', this.assetCountForChennai.unAssignedLaptopCount+this.assetCountForPune.unAssignedLaptopCount],
      ['Stock', this.assetCountForChennai.laptopCount+this.assetCountForPune.laptopCount],
     
    ];



})

  }

assign(assignAsset:assetsDTO){
  this.modal.open(AssignAssetComponent,{data:assignAsset})
}





columnNames = ['Available', 'Stock'];
height=200;
width=300;
type=ChartType.PieChart
myOptions = {
 tooltip:{
  isHtml:true,
  text:'value',
  trigger: 'none'
},
pieSliceText:'value'
};
}
