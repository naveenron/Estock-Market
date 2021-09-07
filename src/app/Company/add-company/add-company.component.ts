import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { company } from 'src/app/Models/company';
import { StockExchange, StockPrice } from 'src/app/Models/stock';
import { CompanyService } from 'src/app/Services/company.service';
import { StockService } from 'src/app/Services/stock.service';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  form!: FormGroup;
  code = "";
  stockPrice?: number;
  isAddMode?: boolean;
  loading = false;
  submitted = false;
  stockList?: StockExchange[];
  stockValue?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.code = this.route.snapshot.params['companyCode'];
    this.isAddMode = !this.code;

    this.form = this.formBuilder.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      companyCeo: ['', Validators.required],
      website: ['', Validators.required],
      turnover: ['', Validators.required],
      stockExchange: ['', Validators.required],
      latestStockPrice: [],
      stockPrice: ['']
    });

    this.getAllStock();
    if (!this.isAddMode) {
      this.companyService.getById(this.code)
        .pipe()
        .subscribe(data => {
          this.form.patchValue(data)
          this.getStockPriceBycode();
          console.log("editdata", data);
        },
          error => {
            console.log(error);
          });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCompany();
    } else {
      this.updateCompany();
    }
  }

  private getAllStock() {
    this.companyService.getAllStock()
      .subscribe(
        data => {
          this.stockList = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  private getStockPriceBycode() {
    this.stockService.getLatestStockPrice(this.code)
      .subscribe(
        data => {
          this.stockValue = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  private createCompany() {
    this.companyService.Create(this.form.value)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
          console.log(error);
        }
      });
  }

  private updateCompany() {
    if (this.form.value.stockPrice > 0) {
      this.stockService.Create(this.form.value.companyCode, this.form.value.stockPrice)
        .pipe()
        .subscribe({
          next: () => {
          },
          error: error => {
            this.loading = false;
            console.log(error);
          }
        });
    }
    this.companyService.Update(this.form.value)
      .pipe()
      .subscribe({
        next: () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error: error => {
          this.loading = false;
          console.log(error);
        }
      });
  }
}

