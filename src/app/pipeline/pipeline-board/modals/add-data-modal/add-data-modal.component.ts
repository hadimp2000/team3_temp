import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-data-modal',
  templateUrl: './add-data-modal.component.html',
  styleUrls: ['./add-data-modal.component.scss'],
})
export class AddDataModalComponent implements OnInit {
  constructor(public _dialog: MatDialog) {}

  ngOnInit(): void {}

  public openDialog() {
    const dialogRef = this._dialog.open(AddDataModalComponent, {
      data: {},
      panelClass: 'my-custom-dialog-class',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  onClick(): void {
    this._dialog.closeAll();
  }
}
