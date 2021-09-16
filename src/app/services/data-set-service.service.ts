import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SendRequestService} from "./send-request-service.service";


@Injectable({
  providedIn: 'root'
})
export class DataSetServiceService implements OnInit {
  dataSets: object[] = [];
  pipeLines: object[] = [];


  constructor() {
  }

  async ngOnInit() {
  }

  createData(name: string, position: number) {
    return {
      name: name,
      position: position,
      symbol: '',
      deleteIcon: ''
    }

  }


  async getAllCsvDataSets(): Promise<object[]> {
    const {csvFiles} = await SendRequestService.sendRequest(
      `https://localhost:5001/users/${localStorage.getItem('username')}/csvs`,
      true,
    )
    let csvDataSets: object[] = [];
    for (const csv of csvFiles) {
      csvDataSets.push({
          position: this.dataSets.length + 1,
          name: csv,
          symbol: '',
          deleteIcon: ''
        }
      )
    }
    return csvDataSets;
  }

  async getCsvDataSet(name: string): Promise<any[]> {
    const {content} = await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/csv/${name}?token=${localStorage.getItem('token')}`,
      true
    )
    return content;
  }

  async deleteCsvDataSet(name: string) {
    let response = await SendRequestService.deleteRequest(
      `https://localhost:5001/dataset/csv/delete/${name}?token=${localStorage.getItem('token')}`
    )

  }

  async deleteSqlDataSet(name: string) {
    let response = await SendRequestService.deleteRequest(
      `https://localhost:5001/dataset/sqlserver/delete/${name}?token=${localStorage.getItem('token')}`
    )

  }

  async getAllDataSets(): Promise<object[]> {
    const {datasets} = await SendRequestService.sendRequest(
      `https://localhost:5001/users/${localStorage.getItem('username')}/datasets`,
      true,
    )
    for (const dataset of datasets) {
      this.dataSets.push({
          position: this.dataSets.length + 1,
          name: dataset.name,
          symbol: dataset.type,
          deleteIcon: ''
        }
      )
    }
    return this.dataSets;
  }


  async getAllPipelines(): Promise<any[]> {
    const {pipelines} = await SendRequestService.sendRequest(
      `https://localhost:5001/users/${localStorage.getItem('username')}/pipelines`,
      true,
    )

    for (const pipeline of pipelines) {
      this.pipeLines.push({
          position: this.pipeLines.length + 1,
          name: pipeline,
          deleteIcon: ''
        }
      )
    }
    return this.pipeLines;
  }

  async createPipeline() {
    let details: any;
    if (this.pipeLines.length == 0) {
      details = {
        name: `pipeline 1`,
        content: ''
      }
    } else {
      // @ts-ignore
      let name = this.pipeLines[this.pipeLines.length - 1].name;
      let number = parseInt(name.substr(name.length - 1));
      details = {
        name: `pipeline ${number + 1}`,
        content: ''
      }
    }

    await SendRequestService.sendRequest(
      `https://localhost:5001/pipeline/create?token=${localStorage.getItem('token')}`,
      true,
      details
    )
    location.reload();
  }

  async deletePipeline(name: string): Promise<any> {
    await SendRequestService.deleteRequest(
      `https://localhost:5001/pipeline/delete/${name}?token=${localStorage.getItem('token')}`
    )
    location.reload();
  }

  // SQL-DATA-SETS
  async getAllSqlTables(dbName: string, dbUserName: string, dbPassword: string, dbUrl: string): Promise<string[]> {
    const {tableNames} = await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/sqlserver/tables?dbName=${dbName}&url=${dbUrl}`,
      true
    )
    return tableNames;
  }

  async getSqlDataSet(name: string): Promise<any[]> {
    const {content} = await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/sqlserver/${name}?token=${localStorage.getItem('token')}`,
      true
    )
    return content;
  }

  async createSqlDataset(dbName: string, dbUserName: string, dbPassword: string, dbUrl: string, name: string, table: string) {
    const details = {
      dbName: dbName,
      dbUsername: dbUserName,
      dbPassword: dbPassword,
      url: dbUrl,
      name: name,
      table: table

    }
    await SendRequestService.sendRequest(
      `https://localhost:5001/dataset/sqlserver/create?token=${localStorage.getItem('token')}`,
      true,
      details
    )
  }


  async csvOrSql(name: string): Promise<string> {
    const csvs: object[] = await this.getAllCsvDataSets();
    let datasetType = 'sql';
    csvs.forEach((csv) => {
      // @ts-ignore
      if (csv.name === name)
        datasetType = 'csv';
    })
    return datasetType;
  }

}



