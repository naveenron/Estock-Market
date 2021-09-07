import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { CompanyDetailsComponent } from './Company/company-details/company-details.component';
import { StockdetailsComponent } from './Company/stock-details/stock-details.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/List-Company', pathMatch: 'full' },
  { path: 'add-company', component: AddCompanyComponent},
  { path: 'edit-company/:companyCode', component: AddCompanyComponent},
  { path: 'List-Company', component: CompanyDetailsComponent},
  { path: 'stock-details', component: StockdetailsComponent },
  { path: '**', component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
