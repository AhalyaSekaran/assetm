import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../../../services/asset.service';
import { assetsDTO } from '../../../dto/assetsDTO';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.css']
})
export class ViewAssetComponent implements OnInit {
  asetSerial!: string;
  assetEntity!: assetsDTO;
  constructor(private assetService:AssetService,private route: ActivatedRoute,public dialogRef: MatDialogRef<ViewAssetComponent>,@Inject(MAT_DIALOG_DATA) public data: assetsDTO,) { }
assetDto:assetsDTO=new assetsDTO();
  ngOnInit() {
    //console.log(this.data);
    this.assetDto=this.data;
  }

}
