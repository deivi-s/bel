import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { UserInfrastructure } from '../../infrastructure/user.infraestructure';

@Component({
  selector: 'app-config-product',
  templateUrl: './config-product.component.html',
  styleUrls: ['./config-product.component.css'],
})
export class ConfigProductComponent implements OnInit {
  listCategories: any = [];
  listQuestions: any[] = [];
  listQuestionsCopy: any[] = [];

  countAnswers: any = [];
  question: any;
  preguntaId: number;
  toggleData: any;
  enviado = false;

  constructor(private readonly userAdmin: UserInfrastructure,
    private readonly router: Router) {}

  ngOnInit() {
    this.questions();
    this.subCategories();
  }

  questions() {
    this.userAdmin.listQuestions().subscribe({
      next: (data: any) => {
        this.listQuestions = data;
        this.listQuestionsCopy = data;
      },
    });
  }

  subCategories() {
    this.userAdmin.listCategories().subscribe({
      next: (data: any) => {
        console.log(data);
        this.listCategories = data;
      },
    });
  }

  mainQuestion(id: number) {
    this.preguntaId = id;
    this.listQuestions =this.listQuestionsCopy;
    this.listQuestions = this.listQuestions.filter((data) => data.id_categoria === id);

    this.listQuestions.map((data: any) => {
      this.countAnswers.push({
        id_usuario: null,
        id_pregunta: data.id,
        respuesta: null,

      });
    });

    this.question = this.listQuestions[0];
  }

  answer(preguntaId: number, opcion: string) {

    const answer = this.countAnswers.findIndex(
      (data: any) => data.id_pregunta === preguntaId
    );

    this.countAnswers[answer] = { id_pregunta: preguntaId, respuesta: [opcion]};

    if (answer + 1 >= this.countAnswers.length) {
      return;
    }

    this.question = this.listQuestions[answer + 1];


  }


  send(){
    localStorage.setItem('market',JSON.stringify(this.countAnswers));
    this.userAdmin.asnwerSave(this.countAnswers).subscribe((res) => {
      this.router.navigate([`/recommendation`]);

    });

  }

  sendMulti(preguntaId: number) {

    const answer = this.countAnswers.findIndex(
      (data: any) => data.id_pregunta === preguntaId
    );

    this.countAnswers[answer] = { id_pregunta: preguntaId, respuesta: this.toggleData };

    if (answer + 1 >= this.countAnswers.length) {
      this.enviado = true;
      return;
    }

    this.question = this.listQuestions[answer + 1];
  }

}
