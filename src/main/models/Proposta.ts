import { ModalidadeEmprestimo } from "./ModalidadeEmprestimo";

export class Proposta {

   private cliente: string
   private emprestimos: Array<ModalidadeEmprestimo>

   constructor(cliente: string, emprestimos: Array<ModalidadeEmprestimo>) {
      this.cliente = cliente;
      this.emprestimos = emprestimos;
   }

   getCliente() {
      return this.cliente;
   }

   getEmprestimos() {
      return this.emprestimos;
   }

}