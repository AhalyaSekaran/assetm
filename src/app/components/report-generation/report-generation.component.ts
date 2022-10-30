import { NgToastService } from 'ng-angular-popup';
import { Component, OnInit } from '@angular/core';
import { LogedInUser } from 'src/app/dto/LogedInUser';
import { ReportDto } from 'src/app/dto/report-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report-generation',
  templateUrl: './report-generation.component.html',
  styleUrls: ['./report-generation.component.css']
})
export class ReportGenerationComponent implements OnInit {

  newReportGroup: any;
  adminDetails:LogedInUser= new LogedInUser();
  newReport:ReportDto=new ReportDto();

  constructor(private reportService:ReportService,private toast:NgToastService,private router:Router) { }

  report:ReportDto=new ReportDto();
  ngOnInit() {
    this.adminDetails=JSON.parse(sessionStorage.getItem('AdminPayload') ||'{}')

    this.newReportGroup = new FormGroup({

      "location": new FormControl(null, [Validators.required]),
      "purchaseDate": new FormControl(null, [Validators.required]),
      "assetStatus":new FormControl(null,[Validators.required,]),


    })
  }
  get assetStatus() { return this.newReportGroup.get('assetStatus'); }
  get location() { return this.newReportGroup.get('location'); }
  get purchaseDate() { return this.newReportGroup.get('purchaseDate'); }

  submitted = false;



  addReport()
  {
    console.log(this.newReport.purchaseDate);
    console.log(this.newReport.location);
    console.log(this.newReport.assetStatus);

    this.submitted=true;
    if(this.newReportGroup.valid){
      this.reportService.downloadReport(this.newReport.purchaseDate,this.newReport.location,this.newReport.assetStatus).subscribe(data=>{
        saveAs(data,'FileName.xlsx')
        // alert(data);
      },error=>{

      })
    }
    else{
      return this.newReportGroup;
    }
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
