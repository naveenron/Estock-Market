import { Component, OnInit } from '@angular/core';
import { company } from 'src/app/Models/company';
import { CompanyService } from 'src/app/Services/company.service';
import { StockService } from 'src/app/Services/stock.service';
@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  companyList?: company[];
  stockValue?: number;
  searchText?: string;

  constructor(private companyService: CompanyService, private stockService: StockService) { }

  ngOnInit(): void {
    this.getAllComapny();
  }
  getAllComapny(): void {
    this.companyService.getAll()
      .subscribe(
        data => {
          this.companyList = data;
          this.companyList.forEach(element => {
            this.stockService.getLatestStockPrice(element.companyCode!)
              .subscribe(
                data => {
                  element.stockPrice = data;
                  console.log(data);
                },
                error => {
                  console.log(error);
                });
          });
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteCompany(code: string) {
   this.stockService.DeleteStockPrice(code).subscribe();

    const comp = this.companyList?.find(x => x.companyCode === code);
    this.companyService.delete(code)

      .subscribe(() => this.companyList = this.companyList?.filter(x => x.companyCode !== code));
  }

}
