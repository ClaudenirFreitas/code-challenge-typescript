import { Cliente } from "./Cliente";

export class ModalidadeEmprestimo {

   private tipo: string
   private taxa: number

   constructor(tipo: string, taxa: number) {
      this.tipo = tipo;
      this.taxa = taxa;
   }

   getTipo() {
      return this.tipo;
   }

   getTaxa() {
      return this.taxa;
   }

}

export const PESSOAL = new ModalidadeEmprestimo("pessoal", 4);
export const COM_GARANTIA = new ModalidadeEmprestimo("com garantia", 3);
export const CONSIGNADO = new ModalidadeEmprestimo("consignado", 2);
export const ESTUDANTE = new ModalidadeEmprestimo("estudante", 1);



type Condicao = (cliente: Cliente) => boolean

class Regra {

   private condicoes: Array<Condicao> = []

   condicao(condicao: Condicao): Regra {
      this.condicoes.push(condicao);
      return this;
   }

   processar(cliente: Cliente): boolean {
      return this.condicoes
         .every(condicao => condicao(cliente))
   }

}

class AgregadorDeRegras {

   private regras: Array<Regra> = []

   adicionarRegra(): AgregadorDeRegras {
      const novaRegra = new Regra();
      this.regras.push(novaRegra);
      return this;
   }

   condicao(condicao: Condicao): AgregadorDeRegras {
      this.regras[this.regras.length - 1].condicao(condicao);
      return this;
   }

   processar(cliente: Cliente): boolean {
      return this.regras
         .some(regra => regra.processar(cliente))
   }

}

const moradorDeSP: Condicao = cliente => cliente.getLocalizacao() === "SP";
const salarioMenorIgual3000: Condicao = cliente => cliente.getSalario() <= 3000;
const idadeMenor30: Condicao = cliente => cliente.getIdade() < 30;
const salarioEntre3000e5000: Condicao = cliente => cliente.getSalario() > 3000 && cliente.getSalario() < 5000;
const salarioMaiorIgual5000: Condicao = cliente => cliente.getSalario() >= 5000;
const idade18a25Anos: Condicao = cliente => cliente.getIdade() > 17 && cliente.getIdade() < 25;
const moradorMG: Condicao = cliente => cliente.getLocalizacao() === "MG"

const modalidades = [
   {
      modalidade: PESSOAL,
      regras: function (cliente: Cliente) {
         return new AgregadorDeRegras()
            .adicionarRegra()
            .condicao(salarioMenorIgual3000)
            .adicionarRegra()
            .condicao(salarioEntre3000e5000)
            .adicionarRegra()
            .condicao(salarioMaiorIgual5000)
            .processar(cliente);
      }
   },
   {
      modalidade: COM_GARANTIA,
      regras: function (cliente: Cliente) {
         return new AgregadorDeRegras()
            .adicionarRegra()
            .condicao(salarioMenorIgual3000)
            .condicao(moradorDeSP)
            .condicao(idadeMenor30)
            .adicionarRegra()
            .condicao(salarioEntre3000e5000)
            .condicao(moradorDeSP)
            .adicionarRegra()
            .condicao(salarioMaiorIgual5000)
            .condicao(idadeMenor30)
            .processar(cliente);
      }
   },
   {
      modalidade: CONSIGNADO,
      regras: function (cliente: Cliente) {
         return new AgregadorDeRegras()
            .adicionarRegra()
            .condicao(salarioMaiorIgual5000)
            .condicao(idadeMenor30)
            .processar(cliente)
      }
   },
   {
      modalidade: ESTUDANTE,
      regras: function (cliente: Cliente) {
         return new AgregadorDeRegras()
            .adicionarRegra()
            .condicao(idade18a25Anos)
            .condicao(moradorMG)
            .processar(cliente)
      }
   }

]

export function analisar(cliente: Cliente): Array<ModalidadeEmprestimo> {
   return modalidades
      .filter(modalidade => modalidade.regras(cliente))
      .map(modalidade => modalidade.modalidade);
}