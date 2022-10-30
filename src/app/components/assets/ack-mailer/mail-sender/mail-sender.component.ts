import { NgToastService } from 'ng-angular-popup';
import { AllServiceService } from 'src/app/services/all-service.service';
import { assetsDTO } from 'src/app/dto/assetsDTO';
import { AssetService } from 'src/app/services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-mail-sender',
  templateUrl: './mail-sender.component.html',
  styleUrls: ['./mail-sender.component.css']
})
export class MailSenderComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private assetService:AssetService,
    private mailService:AllServiceService,
    private toast:NgToastService,
    private router:Router) { }
    isSended:boolean=false;
  empId!:string;
  public available:assetsDTO[]=[
    {
      assetName: '',
      serialNumber: '',
      addedBy: '',
      location: '',
      purchaseDate:new Date(),
      warrantyDate: new Date(),
      modelName: '',
      operatingSystem: '',
      type: '',
      empId: '',
      status: '',
      assignedDate:new Date()

    },
  ];
  public mailList:assetsDTO[]=[
    {
      assetName: 'Drop Here',
      serialNumber: '',
      addedBy: '',
      location: '',
      purchaseDate:new Date(),
      warrantyDate: new Date(),
      modelName: '',
      operatingSystem: '',
      type: '',
      empId: '',
      status: '',
      assignedDate:new Date()
     
    }
  ];
  listAssetsMail!:assetsDTO[];
  
  ngOnInit(): void {
    this.empId=this.route.snapshot.params['empId'];
    this.assetService.getAssetsByEmpId(this.empId).subscribe(data=>{
      this.available=data;
      this.available.push({
        assetName: '',
        serialNumber: '',
        addedBy: '',
        location: '',
        purchaseDate:new Date(),
        warrantyDate: new Date(),
        modelName: '',
        operatingSystem: '',
        type: '',
        empId: '',
        status: '',
        assignedDate:new Date()
       
      });

    },error=>{

    })
  }

  drop(event: CdkDragDrop<assetsDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


mailListCopy!:assetsDTO[];

sendAckMail(){


if(this.mailList.length>1){
  this.isSended=true;
  this.mailList.forEach(x=>{
  
    if(x.assetName=='Drop Here'){
      this.mailList.splice(this.mailList.indexOf(x),1);
    }
   
  });
  this.mailService.sendAckMail(this.mailList,this.empId).subscribe(data=>{
    this.isSended=false;
    this.toast.success({detail:"Success",summary:"Mail Sent Successfully",duration:3500});
    this.router.navigateByUrl('/services/recently/assigned-list')
  },error=>{})
}
else{
  this.toast.warning({detail:"Opps List is Empty !",summary:"Add atleast one asset",duration:2500});
}
}

}
