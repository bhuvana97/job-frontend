import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
private backendurl="https://job-app-31gg.onrender.com";
private apiUrl="https://job-app-31gg.onrender.com";
  constructor(private httpclient: HttpClient) {
   }
   getJsondata(){
     return this.httpclient.get(this.backendurl+'/api/data');
   }
  submitApplication(formData: FormData): Observable<any> {
    // Log the formData for debugging
    console.log(formData.getAll('name'));
    console.log(formData.getAll('email'));
    console.log(formData.getAll('contact'));
    console.log(formData.getAll('qualification'));
    console.log(formData.getAll('resume'));
    return this.httpclient.post(`${this.apiUrl}/upload`, formData);
  }
}
