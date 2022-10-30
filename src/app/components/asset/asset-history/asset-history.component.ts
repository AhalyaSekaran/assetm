import { Component, OnInit } from '@angular/core';
import { historyOfAsestDTO } from 'src/app/dto/historyOfAssetDTO';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.css']
})
export class AssetHistoryComponent implements OnInit {

  constructor(private assetService:HistoryService ) { }
  historyData!:historyOfAsestDTO[];
page:number=1;
count:number=10;
pageSettings!: { pageSizes: boolean; pageSize: number; };
  ngOnInit() {
    this.assetService.getAllfromHistory().subscribe(data =>{
      this.historyData=data;
      //console.table(data);
    })
  }

}
