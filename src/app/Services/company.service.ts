import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { company } from '../Models/company';
import { StockExchange } from '../Models/stock';

const baseUrl = 'http://localhost:5000/api/v1.0/market/Company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpclient: HttpClient) {
  }

  getAll() {
    return this.httpclient.get<company[]>(`${baseUrl}/getall`);
  }

  getById(code: string) {
    return this.httpclient.get<company>(`${baseUrl}/info/${code}`);
  }

  Create(company: company) {
    return this.httpclient.post<company>(`${baseUrl}/register`, company);
  }

  Update(company: company) {
    return this.httpclient.put<company>(`${baseUrl}/UpdateCompany/${company.companyCode}`, company);
  }

  delete(code: string) {
    return this.httpclient.delete<company>(`${baseUrl}/delete/${code}`);
  }
  
  getAllStock() {
    return this.httpclient.get<StockExchange[]>(`${baseUrl}/getallStock`);
  }
}