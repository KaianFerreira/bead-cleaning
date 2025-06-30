import { Injectable } from '@angular/core';
import { api } from './api/axios';
import { Observable } from 'rxjs';

export interface BarcodeData {
  username: string;
  barcode: string;
  created_at?: string;
}

export interface User {
  username: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeadCleaningService {
  private apiUrl = '/bead-cleaning'; // Base URL da API

  constructor() { }
  convertCustomDate(input: any) {
    // Split the input into date and time
    const [datePart, timePart, period] = input.split(" ");

    // Extract the day, month abbreviation, and year
    const [day, monthAbbr, yearShort] = datePart.split("-");

    // Map of month abbreviations to month numbers
    const months = {
      JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06",
      JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12"
    };
    // Convert time part to standard format
    let [hour, minute, second] = timePart.split(".");
    hour = parseInt(hour, 10);

    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    hour = hour.toString().padStart(2, '0');

    // Full year from 2-digit year (assuming 2000s)
    const fullYear = "20" + yearShort;

    // Final output
    return `${months[monthAbbr as keyof typeof months]}/${day}/${fullYear} ${hour}:${minute}:${second}`;
  }

  // Buscar todos os barcodes
  async getBarcodes(): Promise<BarcodeData[]> {
    const { data: { data } } = await api.get<{ data: BarcodeData[] }>(`${this.apiUrl}/all`);
    return data.map(barcode => {
      return {
        ...barcode,
        created_at: barcode.created_at ? this.convertCustomDate(barcode.created_at) : undefined
      };
    }
    )
  }

  async getBarcodesPaginated(page: number): Promise<BarcodeData[]> {
    const response = await api.get<BarcodeData[]>(`${this.apiUrl}`, {
      params: { page }
    });
    return response.data;
  }

  async submitBarcode(barcodeData: BarcodeData): Promise<BarcodeData> {
    const response = await api.post<BarcodeData>(`${this.apiUrl}`, barcodeData);
    return response.data;
  }
} 