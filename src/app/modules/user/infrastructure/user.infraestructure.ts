import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ResultPage } from 'src/app/core/domain/base.interface';
import {
  BaseInfrastructure,
} from 'src/app/core/infrastructure/base-infrastructure';
import { environment } from 'src/environments/environment';

import { User } from '../domain/user';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserInfrastructure
  extends BaseInfrastructure<User>
  implements UserRepository {

  constructor(http: HttpClient) {
    super(http, 'usuarios');
  }
  page(page: number): Observable<ResultPage<User>> {
    throw new Error("Method not implemented.");
  }

  listProducts(): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}/productos`, null);
  }

  listQuestions(): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/productos/preguntas`);
  }

  listCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/productos/categorias`);
  }


  listSubCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/productos/subcategorias`);
  }

  asnwerSave(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}/productos/respuestas/guardar`, data);
  }

  listQuestionsAsociateProducts(idProduct: number, idQuestions: number): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/productos/preguntas/asociadas/${idProduct}/${idQuestions}`);
  }

  questionsById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/productos/preguntas/${id}`);
  }

  productDetailtById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/productos/${id}`);
  }

  userRegister(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}/usuarios/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}/usuarios/login`, user);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiPath}/usuarios/${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiPath}/usuarios/actualizar`, user);
  }


}
