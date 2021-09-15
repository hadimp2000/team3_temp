import { Component, OnInit } from '@angular/core';
import { DataSetServiceService } from '../../services/data-set-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-set-sample-table',
  templateUrl: './data-set-sample-table.component.html',
  styleUrls: ['./data-set-sample-table.component.scss'],
})
export class DataSetSampleTableComponent implements OnInit {
  dataSet_Service: DataSetServiceService;
  data: any;
  dataset: any = '';
  dataset_keys: any;
  dataset_values: any = [];
  isLoading = true;
  constructor(
    private dataSetService: DataSetServiceService,
    private route: ActivatedRoute
  ) {
    this.dataSet_Service = dataSetService;
  }
  async ngOnInit() {
    let name = this.route.snapshot.params['name'];
    if (name.charAt(0) === '*')
      this.data = await this.dataSet_Service
        .getSqlDataSet(name.substring(1))
        .then((res) => {
          this.isLoading = false;
          return res;
        });
    else
      this.data = await this.dataSet_Service.getCsvDataSet(name).then((res) => {
        this.isLoading = false;
        return res;
      });

    this.dataset_keys = this.data[0];
    let counter = 0;
    for (const obj of this.data) {
      if (counter !== 0) this.dataset_values.push(obj);
      counter++;
    }
  }
}
// const json={
//   "content": [
//     [
//       "PersonID",
//       "LastName",
//       "FirstName",
//       "Address",
//       "City"
//     ],
//     [
//       "1",
//       "Daghyani",
//       "Matin",
//       "Tehran",
//       "Iran"
//     ],
//     [
//       "2",
//       "Nzzari",
//       "Ali",
//       "Tehran2",
//       "Iran2"
//     ],
//     [
//       "3",
//       "Aghaee",
//       "Mohammad",
//       "Tehran3",
//       "Iran3"
//     ],
//     [
//       "4",
//       "Taslime",
//       "Sourosh",
//       "Tehran4",
//       "Iran4"
//     ]
//   ]
// }
