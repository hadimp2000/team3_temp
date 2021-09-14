import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sql-form-modal',
  templateUrl: './sql-form-modal.component.html',
  styleUrls: ['./sql-form-modal.component.scss']
})
export class SqlFormModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SqlFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
export interface DialogData {
  animal: string;
  name: string;
}
