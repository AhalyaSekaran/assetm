import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CONFIRM_DIALOG_DATA } from '../CONFIRM_DIALOG_DATA';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<CustomAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data:CONFIRM_DIALOG_DATA) { }

  ngOnInit(): void {
  }
closeComponent(){
  this.dialogRef.close(false);
}
}
