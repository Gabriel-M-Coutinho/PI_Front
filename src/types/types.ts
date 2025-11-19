export type UserDTO = {
    fullName: string,
    email: string,
    cpfCnpj: string,
    password: string
  }

  export type LoginDTO = {
    username:string,
    password:string
  }

// Para o CnaeSecundario que é um BsonArray no C#
export interface CnaeSecundario {
  // Como é um BsonArray, pode conter vários tipos
  // Normalmente em MongoDB retorna como array de strings/numbers
  // Ou pode ter a estrutura do MongoDB com $numberInt, $numberDouble, etc.
  [key: string]: any;
}

export interface Estabelecimento {
  _id: string;
  bairro: string;
  cep: string;
  cidadeExterior: string;
  cnaePrincipal: string;
  cnaeSecundario: string[];
  cnpjBase: string;
  cnpjDV: string;
  cnpjOrdem: string;
  complemento: string;
  correioEletronico: string;
  dataInicioAtividade: string;
  dataSituacaoCadastral: string;
  dataSituacaoEspecial: string;
  ddd1: string;
  ddd2: string;
  dddFAX: string;
  fax: string;
  logradouro: string;
  matrizFilial: string;
  motivoSituacaoCadastral: string;
  municipio: string;
  nomeFantasia: string;
  numero: string;
  pais: string;
  situacaoCadastral: string;
  situacaoEspecial: string;
  telefone1: string;
  telefone2: string;
  tipoLogradouro: string;
  uf: string;
}

export interface ResponseDTO {
  Success: boolean;
  Message: string;
  Data: Estabelecimento[] | null;
  Page?: number | null;
  PageSize?: number | null;
  TotalItems?: number | null;
  TotalPages?: number | null;
}

// Interface para os filtros da query
export interface LeadFilters {
  nomeFantasia?: string;
  cnae?: string;
  situacaoCadastral?: string;
  page?: number;
  pageSize?: number;
  // Você pode adicionar outros campos que seu backend suporta
  // baseado no switch case do controller C#
}