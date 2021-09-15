import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { SqlFormModalComponent } from './sql-form-modal/sql-form-modal.component';
import { ToastService } from 'src/app/common/toast.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  query: string = '';
  currentSearchTerm = new BehaviorSubject<string>('');
  element_data: any = [];
  isWait = false;

  constructor(
    private _toaster: ToastService,
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentSearchTerm.subscribe((current) => (this.query = current));
  }
  animal: string = '';
  name: string = '';

  openDialog(): void {
    const dialogRef = this.dialog.open(SqlFormModalComponent, {
      width: '250px',

      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }

  private getExtension(filename: String) {
    var parts = filename.split('.');
    return parts[parts.length - 1] !== 'csv';
  }

  async fileChange(event: any) {
    this.isWait = true;
    let files: FileList | null;
    let details: any;
    if (event.target !== null) {
      files = (event.target as HTMLInputElement).files;

      if (files && files.length > 0) {
        let file = files[0];
        let formData = new FormData();
        if (this.getExtension(file.name)) {
          this._toaster.openSnackBar(
            'فرمت فایل آپلود شده باید csv باشد',
            'talent'
          );
          this.isWait = false;
          return;
        }
        details = {
          Name: file.name,
          ColDelimiter: ',',
          RowDelimiter: 'newline',
          HasHeader: 'true',
        };
        formData.append('details', JSON.stringify(details));
        formData.append('file', file);
        // let response=await SendRequestService.sendRequest(`https://localhost:5001/dataset/csv/create?token=${localStorage.getItem('token')}`, false, formData);
        this.httpClient
          .post(
            `https://localhost:5001/dataset/csv/create?token=${localStorage.getItem(
              'token'
            )}`,
            formData
          )
          .subscribe(
            () => {
              location.reload();
            },
            (error) => {
              this._toaster.openSnackBar(error.error.message, 'server');
              this.isWait = false;
            }
          );
      }
    }
  }
}
