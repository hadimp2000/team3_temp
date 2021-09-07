import {Component, Input, OnInit} from '@angular/core';
import {FilterDetailsModel} from "../filter-page/filter-details.model";
import {JoinDetailsModel} from "./join-details.model";
import {BoardService} from "../service/board.service";

@Component({
  selector: 'app-join-details',
  templateUrl: './join-details.component.html',
  styleUrls: ['./join-details.component.scss']
})
export class JoinDetailsComponent implements OnInit {
  @Input() join_details!: JoinDetailsModel;
  @Input() joinId!: string ;
  public datasets: string[] = ['covid', 'email', 'marketing'];
  public table1_columns: string[] = ['x', 'y', 'z'];
  public table2_columns: string[] = ['a', 'b', 'c'];

  constructor(private boardService:BoardService) {
  }

  ngOnInit(): void {
  }

  public saveJoin(formValues: any) {
    const data={
      name:'process-join',
      dataset:formValues.dataset,
      joinType:formValues.joinType,
      rightKey: formValues.rightKey,
      leftKey: formValues.leftKey
    }
    this.boardService.changeNodeData(this.joinId,data);
  }

}
