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

export interface MunicipioData {
  municipio: string,
  quantidade: number
}

export interface GraphData {
  categorias: string[],
  valores: number[]
}

export interface Estabelecimento {
  _id: string;

  cnpjBase: string;
  cnpjOrdem: string;
  cnpjDV: string;

  matrizFilial: string;

  nomeFantasia: string;
  situacaoCadastral: string;
  motivoSituacaoCadastral: string;

  dataSituacaoCadastral: string;
  dataInicioAtividade: string;
  dataSituacaoEspecial: string;

  cidadeExterior: string;
  pais: string;

  cnaePrincipal: string;
  cnaeSecundario: string[];

  tipoLogradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;

  uf: string;
  municipio: string;

  ddd1: string;
  telefone1: string;
  ddd2: string;
  telefone2: string;
  dddFAX: string;
  fax: string;

  correioEletronico: string;

  situacaoEspecial: string;
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