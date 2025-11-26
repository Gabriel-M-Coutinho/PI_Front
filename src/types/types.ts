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

  dataInicioAtividade: string;
  dataSituacaoCadastral: string;
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

export interface Cnae {
  _id: string;
  descricao: string;
}

export interface Socio {
  _id: string;

  cnpjBase: string;
  identificadorSocio: string;
  nomeSocio: string;
  cnpjCpf: string;
  qualificacaoSocio: string;
  dataEntradaSociedade: string | null;

  pais: string;
  representanteLegal: string;
  nomeRepresentante: string;
  qualificacaoResponsavel: string;

  faixaEtaria: number;
}

export interface FullLead {
  _id: string;

  cnpjBase: string;
  cnpjOrdem: string;
  cnpjDV: string;

  matrizFilial: string;

  nomeFantasia: string;
  situacaoCadastral: string;
  motivoSituacaoCadastral: string;

  dataInicioAtividade: string;
  dataSituacaoCadastral: string;
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

  realCnaePrincipal: Cnae;
  realCnaeSecundario: Cnae[];
  socios: Socio[];
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

export interface UserProfile {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  version: number;
  createdOn: string;
  credits:number;
  claims: Array<{
    type: string;
    value: string;
    issuer: string;
  }>;
  roles: string[];
  logins: Array<{
    loginProvider: string;
    providerKey: string;
    providerDisplayName: string;
  }>;
  tokens: Array<{
    loginProvider: string;
    name: string;
    value: string;
  }>;
  fullName: string;
  cpfCnpj: string;
  tipo: string;
  active: boolean;
  role: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChangePasswordDTO {
  currentPassword:string;
  newPassword:string;
  confirmPassword:string;
}
