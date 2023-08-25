import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from 'src/app/config/services/layout.service';

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
  filterProduct = false;
  listSubCategories: any[] = [];


  constructor(
    private readonly router: Router,
    private readonly userAdmin: UserInfrastructure,
    private layoutService: LayoutService
  ) {
    this.layoutService.configuration = { header: true, menu: true };
  }

  async ngOnInit() {
    this.allProducts = await this.listProducts();
    this.pro = this.allProducts;

    try {
      this.invitado = Boolean(
        JSON.parse(localStorage.getItem('invitado') || '')
      );
      this.subCategories();
    } catch (e) {
      this.invitado = false;
      this.subCategories();
    }
  }

  subCategories() {
    this.userAdmin.listSubCategories().subscribe({
      next: (data: any) => {
        this.listSubCategories = data;
      },
    });
  }


  async filter(idCategoria?: number) {
    this.pro = idCategoria
      ? this.allProducts.filter(
          (product) => product.id_categoria === idCategoria
        )
      : this.allProducts;

    if (idCategoria === 0) {
      this.filterProduct = false;
      return;
    }
    this.filterProduct = true;
  }

  async filterSelect(idSubCategoria?: any){
    const id = Number(idSubCategoria.target.value);
    this.pro = id ? this.allProducts.filter((product) => product.id_sub_categoria === Number(id)) : this.allProducts;

    if (id === 0 || id === null) {
      this.filterProduct = false;
      return;
    }

    this.filterProduct = true;

  }

  async listProducts(idCategoria?: number) {
    this.listAnswersStorage = JSON.parse(localStorage.getItem('market') || '');

    return new Promise<any>((resolve, reject) => {
      const productsMap: any[] = [];
      this.userAdmin.listProducts().subscribe((data: any[]) => {

        data.map((product) => {
          let porcentajeSubTotal: any[] = [];
          let ponderacionSubTotal: any[] = [];

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
                          porcentajeSubTotal.push(res[0]?.opcion_a * res[0]?.ponderacion);
                          ponderacionSubTotal.push(Number(res[0]?.ponderacion));
                        }
                        if (
                          pregunta?.opcion_b === respuesta &&
                          res[0]?.opcion_b
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_b * res[0]?.ponderacion);
                          ponderacionSubTotal.push(Number(res[0]?.ponderacion));
                        }
                        if (
                          pregunta?.opcion_c === respuesta &&
                          res[0]?.opcion_c
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_c * res[0]?.ponderacion);
                          ponderacionSubTotal.push(Number(res[0]?.ponderacion));
                        }
                        if (
                          pregunta?.opcion_d === respuesta &&
                          res[0]?.opcion_d
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_d * res[0]?.ponderacion);
                          ponderacionSubTotal.push(Number(res[0]?.ponderacion));
                        }
                        if (
                          pregunta?.opcion_e === respuesta &&
                          res[0]?.opcion_e
                        ) {
                          porcentajeSubTotal.push(res[0]?.opcion_e * res[0]?.ponderacion);
                          ponderacionSubTotal.push(Number(res[0]?.ponderacion));
                        }

                      }
                    );
                    const initial = 0;
                    const initialPonderacion = 0;
                    const sum = porcentajeSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue,initial);
                    const sumPonderacion = ponderacionSubTotal.reduce((accumulator, currentValue) => accumulator + currentValue,initialPonderacion);

                    let porcentaje = 0;

                    porcentaje = Math.round(sum / porcentajeSubTotal?.length);

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

  detail(id: number, procentaje: number) {
    this.router.navigate([`/recommendation/detail/${id}/${procentaje}`]);
  }
}
