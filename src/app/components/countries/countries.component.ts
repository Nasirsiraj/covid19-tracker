import { Component, OnInit } from '@angular/core';
import {DataServiceService} from '../../services/data-service.service';
import {GlobalDataSummary} from '../../models/global-data';
import {getExpressionLoweringTransformFactory} from '@angular/compiler-cli/src/transformers/lower_expressions';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  constructor(
    private _service: DataServiceService
  ){}
  data: GlobalDataSummary[];
  countries: string[] = [];
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  totalConfirmed = 0;



  updateValue(country){
    this.data.forEach(cs =>{
      if(cs.country == country){
        this.totalConfirmed = cs.confirmed;
        this.totalActive = cs.active;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });
  }


  ngOnInit(): void {
    this._service.getGlobalData().subscribe(result => {
      this.data = result;
      this.data.forEach(cs => {
        this.countries.push(cs.country);
      });
    });
  }
}
