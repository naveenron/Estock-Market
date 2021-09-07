import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { CompanyDetailsComponent } from './Company/company-details/company-details.component';
import { StockdetailsComponent } from './Company/stock-details/stock-details.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
// Reactive Form Module
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AvgPipe } from './Pipes/avg.pipe';
import { MinPipe } from './Pipes/min.pipe';
import { MaxPipe } from './Pipes/max.pipe';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { CompanyService } from './Services/company.service';
import { StockService } from './Services/stock.service';
@NgModule({
  declarations: [
    AppComponent,
    AddCompanyComponent,
    NoPageFoundComponent,
    HeaderComponent,
    CompanyDetailsComponent,
    StockdetailsComponent,
    AvgPipe,
    MinPipe,
    MaxPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule, 
    Ng2SearchPipeModule
  ],
  providers: [
    CompanyService,
    StockService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
