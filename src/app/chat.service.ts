import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:5000';
  public conversationHistory: { sender: string, message: string }[] = [];

  constructor(private http: HttpClient) {}


  create<T>(resource: string, item: any): Observable<T> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        body.set(key, item[key]);
      }
    }

    console.log('Parametros POST', item)
    return this.http.post<T>(`${this.apiUrl}/${resource}`, body.toString(), {headers: headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método privado para manejar errores
  private handleError(error: any, c: Observable<any>): ObservableInput<any>{
    console.error('Ocurrió un error:', error);
    throw error;
  }

  sendMessage(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { message: message });
  }
}
