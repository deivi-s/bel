import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  allProductsFilter: any[] = [];
  allProducts: any[] = [];
  listAnswersStorage: any[];
  listAllQuestions: any[];
  porcentajeTotal: any[] = [];
  pro: any[] = [];
  invitado = false;

  constructor(
    private readonly router: Router,
    private readonly userAdmin: UserInfrastructure
  ) {}

  async ngOnInit() {
    this.allProducts = await this.listProducts();
    this.pro = this.allProducts;
    this.invitado = Boolean( JSON.parse(localStorage.getItem('invitado') || ''));
  }

  /* async ngDoCheck() {
    try {
      const invitado = JSON.parse(localStorage.getItem('invitado') || '');

      if (invitado) {
        const pros = this.allProductsFilter.filter((aa) => aa.porcentaje <= 70);
        this.allProducts = pros;
      } else {
        this.allProducts = this.allProductsFilter;
      }
    } catch (error) {
      this.allProducts = this.allProductsFilter;
    }
  } */

  async filter(idCategoria?: number) {
    this.pro = idCategoria ? this.allProducts.filter((product) => product.id_sub_categoria === idCategoria ) : this.allProducts;
  }

  async listProducts(idCategoria?: number) {
    this.listAnswersStorage = JSON.parse(localStorage.getItem('market') || '');
    /*   const invitado = JSON.parse(localStorage.getItem('invitado') || ''); */
    let totalPreguntas = 0;

    /* this.listAnswersStorage.map((data) => {
      totalPreguntas += data?.respuesta?.length
    }); */

    return new Promise<any>((resolve, reject) => {
      const productsMap: any[] = [];
      this.userAdmin.listProducts().subscribe((data: any[]) => {
        data.map((product) => {
          let porcentajeSubTotal: any[] = [];

          this.listAnswersStorage.map((questionStorage: any) => {
            this.userAdmin
              .listQuestionsAsociateProducts(
                product.id,
                questionStorage.id_pregunta
              )
              .subscribe((res) => {
                this.userAdmin
                  .questionsById(questionStorage.id_pregunta)
                  .subscribe((pregunta) => {
                    questionStorage.respuesta.map(
                      (respuesta: any, index: number) => {
                        if (
                          pregunta?.opcion_a === respuesta &&
                          res[0]?.opcion_a
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_a);
                        }
                        if (
                          pregunta?.opcion_b === respuesta &&
                          res[0]?.opcion_b
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_b);
                        }
                        if (
                          pregunta?.opcion_c === respuesta &&
                          res[0]?.opcion_c
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_c);
                        }
                        if (
                          pregunta?.opcion_d === respuesta &&
                          res[0]?.opcion_d
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_d);
                        }
                        if (
                          pregunta?.opcion_e === respuesta &&
                          res[0]?.opcion_e
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_e);
                        }
                      }
                    );
                    const initial = 0;
                    const sum = porcentajeSubTotal.reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      initial
                    );
                    const porcentaje = Math.round(
                      sum / porcentajeSubTotal?.length
                    );
                    product.porcentaje = porcentaje;
                  });
              });
          });

          productsMap.push(product);
        });
      });

      resolve(productsMap);
    });
  }

  filterProduct(porcentaje: any) {
    const invitado = JSON.parse(localStorage.getItem('invitado') || '');

    if (porcentaje >= 70 && invitado) {
      return true;
    }
    return;
  }

  detail(id: number, procentaje: number) {
    this.router.navigate([`/recommendation/detail/${id}/${procentaje}`]);
  }
}
