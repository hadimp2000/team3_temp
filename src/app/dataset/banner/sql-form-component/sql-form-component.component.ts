import { Component, OnInit } from '@angular/core';
import { FetchUserDataService } from '../../../services/fetch-user-data-service.service';
import { Router } from '@angular/router';
import { SignUpModel } from '../../../identify/models';
import { DataSetServiceService } from '../../../services/data-set-service.service';
import { take } from 'rxjs/operators';
import { ToastService } from 'src/app/common/toast.service';

@Component({
  selector: 'app-sql-form-component',
  templateUrl: './sql-form-component.component.html',
  styleUrls: ['./sql-form-component.component.scss'],
})
export class SqlFormComponentComponent implements OnInit {
  public dbName: string = '';
  public password: string = '';
  public dbUserName: string = '';
  public dbUrl: string = '';
  public name: string = '';
  public selectTable: string = '';
  sqlTables: string[] = [];

  constructor(
    private fetchDataService: FetchUserDataService,
    private dataSetService: DataSetServiceService,
    private router: Router,
    private _toaster: ToastService
  ) {}

  async formChange(formValue: any) {
    this.dbName = formValue.dbName;
    this.password = formValue.password;
    this.dbUserName = formValue.username;
    this.dbUrl = formValue.dbUrl;
    this.name = formValue.name;
    this.selectTable = formValue.selectTable;
    this.sqlTables = await this.dataSetService.getAllSqlTables(
      this.dbName,
      this.dbUserName,
      this.password,
      this.dbUrl
    );
  }

  async createSqlDataSet(formValue: any) {
    if (
      this.dbName.length > 0 &&
      this.dbUrl.length > 0 &&
      this.name.length > 0 &&
      this.selectTable.length > 0
    ) {
      this._toaster.openSnackBar('با موفقیت به پایگاه داده متصل شد', 'talent');
      await this.dataSetService.createSqlDataset(
        this.dbName,
        this.dbUserName,
        this.password,
        this.dbUrl,
        this.name,
        this.selectTable
      );
      await this.router.navigateByUrl('pipelines/dataSet');
    } else
      this._toaster.openSnackBar(
        'مقادیر نام پایگاه داده و نشانی و نام دیتاست و جدول بایستی پر شوند',
        'talent'
      );
  }

  ngOnInit() {
    // this.sqlTables=this.dataSetService.getAllSqlTables()
  }
}
