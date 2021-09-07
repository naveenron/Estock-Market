import { Time } from '@angular/common';
export class StockExchange {
    stockId?: number;
    stockName?: string;
}
export class StockPrice{
    CompanyId?: string;    
    stockPrice?: number;
    createdDate?: Date;
}