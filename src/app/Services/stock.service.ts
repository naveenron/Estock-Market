import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockPrice } from '../Models/stock';
const stockUrl = 'http://localhost:53747/api/v1.0/market/Stock'
@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpclient: HttpClient) {
  }

  getAll() {
    return this.httpclient.get<StockPrice[]>(`${stockUrl}/getAll`);
  }

  getByDate(code: string, startDate: string, endDate: string) {
    return this.httpclient.get<StockPrice[]>(`${stockUrl}/get/${code}/${startDate}/${endDate}`);
  }

  getByCompanyId(code: string) {
    return this.httpclient.get<StockPrice[]>(`${stockUrl}/get?comapanyCode=${code}`);
  }

  getLatestStockPrice(code: string) {
    return this.httpclient.get<number>(`${stockUrl}/getStockPrice/${code}`);
  }

  Create(code: string, stockPrice: number) {
    return this.httpclient.post<StockPrice>(`${stockUrl}/add/${code}?stockPrice=${stockPrice}`, "");
  }
  
  DeleteStockPrice(code: string) {
    return this.httpclient.delete<StockPrice>(`${stockUrl}/delete/${code}`);
  }
}