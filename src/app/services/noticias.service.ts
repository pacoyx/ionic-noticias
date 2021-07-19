import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {

    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadLines() {
    this.headLinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/                                                                                                                                                                                                                                                                                                                                                                                                                                                                top-headlines?apiKey=43de5ccdd526432ab23c2c48427273a4&category=business`)
  }

  getTopHeadLinesCategoria(categoria: string) {

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?apiKey=43de5ccdd526432ab23c2c48427273a4&category=business`)

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);

  }

}
