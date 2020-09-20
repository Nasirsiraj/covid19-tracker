import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private _dataService: DataServiceService
  ) {}
  public totalConfirmed: number = 0;
  public totalDeaths: number = 0;
  public totalRecovered: number = 0;
  public totalActive: number = 0;
  public globalData: GlobalDataSummary [];

  ngOnInit(): void {
    this._dataService.getGlobalData().subscribe(
      {
        next: (result) => {
          console.log(result);
          this.globalData = result;
          result.forEach(cs =>{
            if(!Number.isNaN(cs.confirmed)){
              this.totalActive += cs.active;
              this.totalConfirmed +=cs.confirmed;
              this.totalDeaths += cs.deaths;
              this.totalRecovered +=cs.recovered;
            }
          });
        }
      }
    );
  }
}
