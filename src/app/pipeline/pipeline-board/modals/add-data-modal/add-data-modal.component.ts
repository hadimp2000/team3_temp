import { BooleanInput } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSetServiceService } from 'src/app/services/data-set-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-add-data-modal',
  templateUrl: './add-data-modal.component.html',
  styleUrls: ['./add-data-modal.component.scss'],
})
export class AddDataModalComponent implements OnInit {
  constructor(
    dataSetService: DataSetServiceService,
    public _dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSetService = dataSetService;
  }
  public nameDataset = '';
  dataSetService: any;
  dataSource: any;
  selectedName: any;
  isDisabled: BooleanInput = true;
  displayedColumns: string[] = ['name'];
  isLoading = true;
  async ngOnInit() {
    this.dataSetService = new DataSetServiceService();
    this.dataSource = new MatTableDataSource(
      await this.dataSetService.getAllDataSets().then((res: any) => {
        this.isLoading = false;
        return res;
      })
    );
  }

  public openDialog(service: any, type: String) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      service,
      type: type,
    };
    this._dialog.open(AddDataModalComponent, dialogConfig);
  }
  activeBtn() {
    this.isDisabled = false;
  }
  setName() {
    if (this.data.type === 'changeDist') {
      this.data.service.changeDist(this.selectedName);
      this.data.service._toaster.openSnackBar(
        ' مقصد با موفقیت تغییر کرد ',
        'talend'
      );
      this._dialog.closeAll();
      return;
    }
    this.data.type === 'source'
      ? this.data.service.addSourceToPipeline(this.selectedName)
      : this.data.service.addDistToPipeline(this.selectedName);
    this._dialog.closeAll();
  }
  Cancle(): void {
    this._dialog.closeAll();
  }
}
