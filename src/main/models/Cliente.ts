export class Cliente {
   private nome: string
   private cpf: string
   private idade: number
   private localizacao: string
   private salario: number

   constructor(
      nome: string,
      cpf: string,
      idade: number,
      localizacao: string,
      salario: number) {
      this.nome = nome;
      this.cpf = cpf;
      this.idade = idade;
      this.localizacao = localizacao;
      this.salario = salario;
   }

   getNome() {
      return this.nome;
   }

   getCpf() {
      return this.cpf;
   }

   getIdade() {
      return this.idade;
   }

   getLocalizacao() {
      return this.localizacao;
   }

   getSalario() {
      return this.salario;
   }

}