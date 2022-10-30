import { CustomAlertComponent } from './../components/popup-modals/custom-alert/custom-alert.component';
import { ConfirmDialogComponent } from './../components/popup-modals/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogServicesService {

  constructor(private dialog:MatDialog) { }
  openConfirmDialog(msg: string){
   return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      disableClose:true,
      panelClass:'confirm-dialog-container',
      data:{
        message:msg
      }
    });
  }
  openCustomAlert(msg: string){
    return this.dialog.open(CustomAlertComponent,{
       width:'320px',
       disableClose:true,
       panelClass:'confirm-dialog-container',
       data:{
         message:msg
       }
     });
   }
}
