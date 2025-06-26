import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BarcodeData {
  id?: number;
  username: string;
  barcode: string;
  createdAt: string;
  status: string;
}

export interface User {
  username: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private apiUrl = '/api'; // Base URL da API

  constructor(private http: HttpClient) { }

  // Buscar todos os barcodes
  getBarcodes(): Observable<BarcodeData[]> {
    return this.http.get<BarcodeData[]>(`${this.apiUrl}/barcodes`);
  }

  // Enviar novo barcode
  submitBarcode(barcodeData: BarcodeData): Observable<BarcodeData> {
    return this.http.post<BarcodeData>(`${this.apiUrl}/barcodes`, barcodeData);
  }

  // Buscar barcodes por usuário
  getBarcodesByUser(username: string): Observable<BarcodeData[]> {
    return this.http.get<BarcodeData[]>(`${this.apiUrl}/barcodes/user/${username}`);
  }

  // Buscar barcodes por data
  getBarcodesByDate(date: string): Observable<BarcodeData[]> {
    return this.http.get<BarcodeData[]>(`${this.apiUrl}/barcodes/date/${date}`);
  }

  // Atualizar status de um barcode
  updateBarcodeStatus(id: number, status: string): Observable<BarcodeData> {
    return this.http.patch<BarcodeData>(`${this.apiUrl}/barcodes/${id}`, { status });
  }

  // Deletar barcode
  deleteBarcode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/barcodes/${id}`);
  }

  // Buscar usuário logado
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/current`);
  }

  // Atualizar dados do usuário
  updateUser(userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/user/current`, userData);
  }

  // Método para simular dados quando a API não estiver disponível
  getMockBarcodes(): BarcodeData[] {
    return [
      { id: 1, username: "AE04085", barcode: "1234567890", createdAt: "2024/01/15 06:54:18", status: "Processed" },
      { id: 2, username: "AE04085", barcode: "5699999994", createdAt: "2024/01/15 06:53:42", status: "Processed" },
      { id: 3, username: "AE04085", barcode: "5699999994", createdAt: "2024/01/15 06:53:30", status: "Processed" },
      { id: 4, username: "AE04086", barcode: "9876543210", createdAt: "2024/01/15 06:45:15", status: "Processed" },
      { id: 5, username: "AE04087", barcode: "5556667778", createdAt: "2024/01/15 06:30:22", status: "Processed" }
    ];
  }

  // Método para simular usuário quando a API não estiver disponível
  getMockUser(): User {
    return {
      username: 'AE04085',
      name: 'João Silva',
      role: 'Operator'
    };
  }
} 