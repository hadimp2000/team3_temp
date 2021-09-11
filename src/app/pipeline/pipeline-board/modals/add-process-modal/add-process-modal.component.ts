import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-add-process-modal',
  templateUrl: './add-process-modal.component.html',
  styleUrls: ['./add-process-modal.component.scss'],
})
export class AddProcessModalComponent implements OnInit {
  constructor(
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  public openDialog(service: any, data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      service,
      data,
    };
    this._dialog.open(AddProcessModalComponent, dialogConfig);
  }
  onClickFilter() {
    this.data.service.addNodeBetween(
      this.data.data.src,
      this.data.data.dist,
      'filter',
      this.data.data.id
    );
    this._dialog.closeAll();
  }
  onClickAggregate() {
    this.data.service.addNodeBetween(
      this.data.data.src,
      this.data.data.dist,
      'aggregate',
      this.data.data.id
    );
    this._dialog.closeAll();
  }
  onClickJoin() {
    this.data.service.addNodeBetween(
      this.data.data.src,
      this.data.data.dist,
      'join',
      this.data.data.id
    );
    this._dialog.closeAll();
  }
  onCancle(): void {
    this._dialog.closeAll();
  }
}
