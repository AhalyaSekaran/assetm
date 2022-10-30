import { CONFIRM_DIALOG_DATA } from './../CONFIRM_DIALOG_DATA';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit,Inject, inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:CONFIRM_DIALOG_DATA) { }

  ngOnInit(): void {
  }
  closeComponent(){
    this.dialogRef.close(false)
  }

}
