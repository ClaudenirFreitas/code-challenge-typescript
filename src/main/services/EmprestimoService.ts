import { Cliente } from "../models/Cliente";
import { analisar } from "../models/ModalidadeEmprestimo";
import { Proposta } from "../models/Proposta";

export class EmprestimoService {

   analizarCliente(cliente: Cliente): Proposta {

      return new Proposta(
         cliente.getNome(),
         analisar(cliente)
      );
   }

}