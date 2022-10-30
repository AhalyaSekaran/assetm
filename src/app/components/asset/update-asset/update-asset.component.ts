import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AssetNameDTO } from 'src/app/dto/assetNameDto';
import { assetsDTO } from 'src/app/dto/assetsDTO';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-update-asset',
  templateUrl: './update-asset.component.html',
  styleUrls: ['./update-asset.component.css'],
})
export class UpdateAssetComponent implements OnInit {
  assetId!: number;
  assetEntity!: assetsDTO;
  assetNames!:AssetNameDTO[];
  constructor(
    private assetService: AssetService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateAssetComponent>,
    private router:Router,private toast:NgToastService,
    @Inject(MAT_DIALOG_DATA) public data: assetsDTO
  ) {}

  assetDto: assetsDTO = new assetsDTO();
  ngOnInit(): void {
    this.assetService.getAssetNameList().subscribe((data)=>this.assetNames=data);
    //console.log(this.data);
    this.assetDto = this.data;
  }
  update() {

    this.assetService.UpdateAssets(this.assetDto).subscribe((data)=>{this.assetDto=data
      this.toast.success({detail:"Success",duration:3000,summary:"Assets updated SuccessFully"});
      this.dialogRef.close()
      this.dialogRef.afterClosed().subscribe(d=>{
        this.reloadCurrentRoute();
      })
  });
}
reloadCurrentRoute() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
}




