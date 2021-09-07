import { StockExchange } from './stock';
export class company{
    companyId?: number;
    companyName?: string;
    companyCode?: string;
    companyCeo?: string;
    turnover?: number;
    website?: string;
    stockExchange?: StockExchange;
    stockPrice?: number;
}