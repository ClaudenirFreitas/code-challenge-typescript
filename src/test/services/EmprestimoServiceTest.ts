import { Cliente } from "../../main/models/Cliente"
import { COM_GARANTIA, CONSIGNADO, ESTUDANTE, ModalidadeEmprestimo, PESSOAL } from "../../main/models/ModalidadeEmprestimo"
import { Proposta } from "../../main/models/Proposta"
import { EmprestimoService } from "../../main/services/EmprestimoService"
import each from "jest-each"

describe('EmprestimoService', () => {

   const emprestimoService = new EmprestimoService()

   each(
      [
         // pessoal
         [
            "pessoal",
            new Cliente("jose", "333.333.323.43", 24, "RJ", 3000),
            new Proposta("jose", [PESSOAL])
         ],
         [
            "pessoal",
            new Cliente("jose", "333.333.323.43", 24, "RJ", 4000),
            new Proposta("jose", [PESSOAL])
         ],
         [
            "pessoal",
            new Cliente("jose", "333.333.323.43", 31, "RJ", 6000),
            new Proposta("jose", [PESSOAL])
         ],
         // com garantia
         [
            "com garantia",
            new Cliente("jose", "333.333.323.43", 24, "SP", 3000),
            new Proposta("jose", [PESSOAL, COM_GARANTIA])
         ],
         [
            "com garantia",
            new Cliente("jose", "333.333.323.43", 24, "SP", 4000),
            new Proposta("jose", [PESSOAL, COM_GARANTIA])
         ],
         [
            "com garantia",
            new Cliente("jose", "333.333.323.43", 24, "SP", 6000),
            new Proposta("jose", [PESSOAL, COM_GARANTIA, CONSIGNADO])
         ],
         // consignado
         [
            "consignado",
            new Cliente("jose", "333.333.323.43", 24, "RJ", 6000),
            new Proposta("jose", [PESSOAL, COM_GARANTIA, CONSIGNADO])
         ],
         // estudante
         [
            "estudante",
            new Cliente("jose", "333.333.323.43", 23, "MG", 3000),
            new Proposta("jose", [PESSOAL, ESTUDANTE])
         ]
      ]
      //TODO melhorar descricao do teste
   ).it("Testando emprestimo %s", (tipo, entrada, propostaEsperada) => {
      // given
      const cliente = entrada;
      // when
      const proposta = emprestimoService.analizarCliente(cliente)
      // then
      expect(proposta).toEqual(propostaEsperada)
   })

})