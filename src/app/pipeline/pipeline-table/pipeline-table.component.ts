import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pipeline-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent implements OnInit {
  public dataset: object[] = [
    {
      iso_code1: "AFG",
      iso_code2: "AFG",
      iso_code3: "AFG",
      iso_code4: "AFG",
      iso_code5: "AFG",
      iso_code6: "AFG",
      iso_code7: "AFG",
      iso_code8: "AFG",
      iso_code9: "AFG",
      continent: "asia",
      location: "afghanistan",
      date: "2020-02-24",
      total_cases: "1.0",
      new_cases: "1.0",
      total_deaths: "0",
      new_deaths: "0",
      population: "128783826"
    },
    {
      iso_code1: "AFG",
      iso_code2: "AFG",
      iso_code3: "AFG",
      iso_code4: "AFG",
      iso_code5: "AFG",
      iso_code6: "AFG",
      iso_code7: "AFG",
      iso_code8: "AFG",
      iso_code9: "AFG", continent: "asia",
      location: "afghanistan",
      date: "2020-02-24",
      total_cases: "1.0",
      new_cases: "1.0",
      total_deaths: "0",
      new_deaths: "0",
      population: "128783826"
    },
    {
      iso_code1: "AFG",
      iso_code2: "AFG",
      iso_code3: "AFG",
      iso_code4: "AFG",
      iso_code5: "AFG",
      iso_code6: "AFG",
      iso_code7: "AFG",
      iso_code8: "AFG",
      iso_code9: "AFG", continent: "asia",
      location: "afghanistan",
      date: "2020-02-24",
      total_cases: "1.0",
      new_cases: "1.0",
      total_deaths: "0",
      new_deaths: "0",
      population: "128783826"
    },
    {
      iso_code1: "AFG",
      iso_code2: "AFG",
      iso_code3: "AFG",
      iso_code4: "AFG",
      iso_code5: "AFG",
      iso_code6: "AFG",
      iso_code7: "AFG",
      iso_code8: "AFG",
      iso_code9: "AFG", continent: "asia",
      location: "afghanistan",
      date: "2020-02-24",
      total_cases: "1.0",
      new_cases: "1.0",
      total_deaths: "0",
      new_deaths: "0",
      population: "128783826"
    },
    {
      iso_code1: "AFG",
      iso_code2: "AFG",
      iso_code3: "AFG",
      iso_code4: "AFG",
      iso_code5: "AFG",
      iso_code6: "AFG",
      iso_code7: "AFG",
      iso_code8: "AFG",
      iso_code9: "AFG", continent: "asia",
      location: "afghanistan",
      date: "2020-02-24",
      total_cases: "1.0",
      new_cases: "1.0",
      total_deaths: "0",
      new_deaths: "0",
      population: "128783826"
    }
  ]
  public dataset_keys!: string[];
  public dataset_values: string[][] = [];
  public dataName: string = "Covid data";

  constructor() {
    this.dataset_keys = Object.keys(this.dataset[0]);
    for (const obj of this.dataset) {
      this.dataset_values.push(Object.values(obj));
    }

  }

  ngOnInit(): void {
  }

}
