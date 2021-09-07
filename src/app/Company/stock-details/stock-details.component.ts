import { Component, OnInit } from '@angular/core';
import { company } from 'src/app/Models/company';
import { StockPrice } from 'src/app/Models/stock';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/Services/company.service';
import { StockService } from 'src/app/Services/stock.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockdetailsComponent implements OnInit {
  companyList?: company[];
  stockPriceList?: any[];
  stockValue?: StockPrice;
  form!: FormGroup;
  companyCode?: string;
  startDate?: Date;
  endDate?: Date;
  sDate?: string | null;
  eDate?: string | null;
  stockPrice = "stockPrice"
  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private stockService: StockService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      endDate: [],
      startDate: []
    });

    this.getAllCompany();
  }

  get f() { return this.form.controls; }

  private getAllCompany() {
    this.companyService.getAll()
      .subscribe(
        data => {
          this.companyList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  Search() {
    let check = this.validate();

    if (this.sDate === null && this.eDate === null && check) {
      this.getStockValue(this.companyCode!);
    }
    if (check) {
      this.getStockValueWithDates(this.companyCode!, this.sDate!, this.eDate!);
    }
  }

  private validate(): boolean {
    this.companyCode = this.form.controls.companyCode.value;
    this.sDate = this.datePipe!.transform(this.startDate, 'MM-dd-yyyy hh:mm');
    this.eDate = this.datePipe!.transform(this.form.controls.endDate.value, 'MM-dd-yyyy hh:mm');

    if (this.companyCode === "" || this.companyCode === "Select") {
      alert("Please Select Company Name");
      return false;
    }
    else if (this.sDate !== null && this.eDate === null) {
      alert("Please Select End Date");
      return false;
    }
    else if (this.sDate === null && this.eDate !== null) {
      alert("Please Select Start Date");
      return false;
    }
    else if (this.startDate! >= this.endDate!) {
      alert("Please  Start Date grater than End Date");
      return false;
    }

    return true;
  }

  private getStockValue(code: string) {
    this.stockService.getByCompanyId(code)
      .pipe()
      .subscribe(
        data => {
          this.stockPriceList = data;
          console.log("editdata", data);
        },
        error => {
          console.log(error);
        });
  }

  private getStockValueWithDates(code: string, startDate: string, endDate: string) {
    this.stockService.getByDate(code, startDate, endDate)
      .pipe()
      .subscribe(data => {
        this.stockPriceList = data;
        console.log("editdata1", data);
      },
        error => {
          console.log(error);
        });
  }
}
