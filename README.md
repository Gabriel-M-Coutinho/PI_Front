# Documentação do Sistema de Leads - Receita Federal

## 1. Visão Geral do Projeto

### 1.1 Descrição
Sistema automatizado para importação, processamento e comercialização de dados públicos da Receita Federal do Brasil, permitindo que empresas adquiram leads qualificados e atualizados através de filtros personalizados.

### 1.2 Objetivos
- Automatizar a coleta diária de dados da Receita Federal
- Processar e normalizar informações empresariais
- Disponibilizar interface de busca e filtros avançados
- Comercializar pacotes de leads segmentados
- Garantir atualização constante da base de dados

### 1.3 Stack Tecnológica
- **Backend:** ASP.NET Core (C#) - API RESTful
- **Frontend:** React
- **Banco de Dados:** MongoDB
- **Backup:** Sistema automatizado com retenção


---

## 2. Personas

### Persona 1: Gerente de Vendas B2B
**Nome:** Ricardo Silva  
**Idade:** 38 anos  
**Cargo:** Gerente Comercial  
**Empresa:** Empresa de software B2B (50 funcionários)

**Objetivos:**
- Encontrar empresas recém-abertas para prospecção
- Filtrar empresas por segmento e localização
- Obter dados atualizados de contato
- Reduzir tempo de pesquisa manual

**Dores:**
- Bases de dados desatualizadas
- Dificuldade em segmentar leads qualificados
- Alto custo de ferramentas de prospecção
- Perda de tempo com dados incorretos

**Como o sistema ajuda:**
- Acesso a dados sempre atualizados da Receita Federal
- Filtros por CNAE, localização, porte e data de abertura
- Export de leads em formatos prontos para CRM
- Preço acessível por pacotes de leads

### Persona 2: Analista de Inteligência de Mercado
**Nome:** Mariana Costa  
**Idade:** 32 anos  
**Cargo:** Analista de Market Intelligence  
**Empresa:** Consultoria estratégica (200 funcionários)

**Objetivos:**
- Mapear novos entrantes em mercados específicos
- Analisar tendências de abertura de empresas
- Gerar relatórios setoriais
- Identificar oportunidades de negócio

**Dores:**
- Dados fragmentados em múltiplas fontes
- Dificuldade em análises temporais
- Falta de APIs para integração
- Processos manuais demorados

**Como o sistema ajuda:**
- API para integração com ferramentas de BI
- Histórico completo de alterações cadastrais
- Filtros avançados por múltiplos critérios
- Exportação em diversos formatos (CSV, JSON, Excel)

---

## 3. Histórias de Usuário

### HU-001: Busca de Leads por Filtros
**Como** gerente comercial  
**Eu quero** buscar empresas usando múltiplos filtros (CNAE, localização, porte, data de abertura)  
**Para que** eu possa encontrar leads qualificados para minha equipe de vendas

**Critérios de Aceitação:**
- Sistema permite filtrar por um ou mais CNAEs
- Filtro por estado, cidade ou região
- Filtro por porte da empresa (ME, EPP, demais)
- Filtro por data de abertura (últimos 30, 60, 90 dias ou personalizado)
- Resultados exibidos com paginação
- Preview dos dados antes da compra

### HU-002: Compra de Pacotes de Leads
**Como** usuário autenticado  
**Eu quero** comprar pacotes de leads selecionados  
**Para que** eu possa usar os dados nas minhas estratégias comerciais

**Critérios de Aceitação:**
- Sistema oferece diferentes tamanhos de pacotes (100, 500, 1000, 5000 leads)
- Cálculo automático do valor baseado no pacote
- Checkout com múltiplas formas de pagamento
- Geração de nota fiscal automática
- Download imediato após confirmação de pagamento
- Histórico de compras acessível

### HU-003: Download de Leads em Múltiplos Formatos
**Como** usuário que comprou leads  
**Eu quero** baixar os dados em diferentes formatos  
**Para que** eu possa integrar com minhas ferramentas de trabalho

**Critérios de Aceitação:**
- Download em CSV com separador configurável
- Download em Excel (.xlsx)
- Download em JSON para APIs
- Campos selecionáveis para exportação
- Download disponível por 30 dias após compra

### HU-004: Monitoramento de Atualizações
**Como** usuário recorrente  
**Eu quero** ser notificado sobre novas empresas que atendem meus critérios  
**Para que** eu possa agir rapidamente em oportunidades

**Critérios de Aceitação:**
- Criação de alertas personalizados
- Notificação por email quando novos leads aparecem
- Dashboard com resumo de atualizações


### HU-005: Visualização de Histórico Empresarial
**Como** analista de mercado  
**Eu quero** ver o histórico de alterações de uma empresa  
**Para que** eu possa avaliar sua credibilidade e trajetória

**Critérios de Aceitação:**
- Timeline de alterações cadastrais
- Histórico de mudanças de endereço
- Alterações de quadro societário
- Mudanças de atividade econômica

---

## 4. Requisitos Funcionais

### RF-001: Importação Automática de Dados
Sistema deve importar automaticamente dados públicos da Receita Federal diariamente, processando:
- Dados cadastrais de empresas
- CNAEs primários e secundários
- Endereços completos
- Quadro societário
- Situação cadastral
- Datas de abertura e alterações

### RF-002: Processamento e Normalização
Sistema deve processar e normalizar dados importados:
- Validação de CNPJs
- Normalização de endereços (CEP, estado, cidade)
- Categorização por porte empresarial
- Limpeza de caracteres especiais
- Detecção de duplicatas

### RF-003: Sistema de Busca e Filtros
Interface de busca com filtros:
- Razão social ou nome fantasia
- CNPJ
- CNAE (múltipla seleção)
- Estado, cidade
- Porte (ME, EPP, demais)
- Situação cadastral (ativa, baixada, suspensa)
- Data de abertura (período)
- Capital social (faixa)

### RF-004: Autenticação e Autorização
Sistema de usuários com níveis de acesso:
- Cadastro de usuários (email + senha)
- Login com JWT
- Recuperação de senha
- Perfis: Admin, Cliente 
- Controle de permissões por perfil

### RF-005: Sistema de Créditos/Pacotes
Modelo de comercialização:
- Diferentes tamanhos de pacotes com desconto progressivo
- Histórico de consumo


### RF-006: Checkout e Pagamentos
Integração com gateway de pagamento:
- Pagamento via cartão de crédito
- Pagamento via PIX
- Boleto bancário
- Emissão de nota fiscal automática
- Confirmação por email

### RF-007: Exportação de Dados
Sistema de download de leads:
- Exportação em CSV
- Exportação em Excel
- Exportação em JSON
- Seleção de campos para exportação
- Limite de downloads por tempo

### RF-008: Dashboard Administrativo
Painel para administradores:
- Estatísticas de importação
- Total de registros no banco
- Usuários ativos
- Vendas do período
- Status de serviços
- Logs de importação

### RF-009: API Pública
Endpoints REST para integração:
- Autenticação via API Key
- Busca de empresas
- Consulta de CNPJ específico
- Rate limiting (100 requisições/minuto)
- Documentação Swagger



---

## 5. Requisitos Não Funcionais

### RNF-001: Performance
- Busca de leads deve retornar resultados em menos de 2 segundos
- API deve suportar 1000 requisições simultâneas
- Importação diária deve processar 100.000+ registros em até 2 horas
- Tempo de resposta médio da API < 500ms

### RNF-002: Escalabilidade
- Arquitetura preparada para escala horizontal


### RNF-003: Disponibilidade
- Backups automáticos a cada 24 horas
- Retenção de backups por 60 dias


### RNF-004: Segurança
- Senhas armazenadas com bcrypt (cost factor 12)
- Tokens JWT com expiração de 4 horas
- Rate limiting em todas as rotas públicas
- Validação e sanitização de inputs
- Proteção contra SQL Injection, XSS, CSRF
- Conformidade com LGPD

### RNF-005: Usabilidade
- Tempo de aprendizado < 15 minutos
- Suporte a navegadores modernos (Chrome, Firefox, Safari, Edge)


### RNF-006: Manutenibilidade
- Documentação técnica atualizada
- Logs estruturados (JSON)
- Versionamento de API (semântico)


### RNF-007: Confiabilidade
- Taxa de erro < 0.1%
- Validação de dados em múltiplas camadas


### RNF-008: Conformidade Legal
- Uso exclusivo de dados públicos
- Respeito à LGPD (dados de empresas, não pessoas físicas)
- Termos de uso claros
- Política de privacidade
- Consentimento explícito para marketing

---

## 6. Arquitetura do Sistema

### 6.1 Arquitetura em Camadas

```
┌─────────────────────────────────────┐
│         Frontend (React)            │
│  - Interface do usuário             │
│  - Gerenciamento de estado          │
│  - Requisições HTTP                 │
└─────────────────────────────────────┘
              ↓ HTTPS
┌─────────────────────────────────────┐
│      API Gateway / Load Balancer    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│     API REST (ASP.NET Core)         │
│  - Controllers                      │
│  - Middleware de autenticação       │
│  - Validação de entrada             │
│  - Rate limiting                    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│      Camada de Serviços             │
│  - Lógica de negócio                │
│  - Serviços de domínio              │
│  - Orquestração                     │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│    Camada de Repositório            │
│  - Acesso a dados                   │
│  - Queries otimizadas               │
│  - Padrão Repository                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        MongoDB                      │  
│  - Dados empresariais               │
│  - Usuários e transações            │
│  - Logs e auditoria                 │
└─────────────────────────────────────┘
```

### 6.2 Componentes do Sistema

**Worker de Importação:**
- Serviço background independente
- Download de dados da Receita Federal
- Processamento em batch
- Validação e normalização
- Inserção no MongoDB


**Storage:**
- Armazenamento de arquivos exportados
- Backup de banco de dados
- Logs de aplicação

---

## 7. Modelo de Dados

### 7.1 Coleção: Companies

```javascript
{
  _id: ObjectId,
  cnpj: String (indexed, unique),
  razaoSocial: String,
  nomeFantasia: String,
  cnaesPrincipal: String,
  cnaesSecundarios: [String],
  dataAbertura: Date (indexed),
  situacaoCadastral: String (indexed),
  dataSituacaoCadastral: Date,
  endereco: {
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String (indexed),
    estado: String (indexed),
    cep: String,
    pais: String
  },
  porte: String (indexed), 
  capitalSocial: Decimal,
  quadroSocietario: [{
    nome: String,
    qualificacao: String,
    dataEntrada: Date
  }],
  historicoAlteracoes: [{
    data: Date,
    tipo: String,
    descricao: String
  }],
  telefones: [String],
  emails: [String],
  website: String,
  createdAt: Date,
  updatedAt: Date (indexed),
  importedAt: Date
}
```

### 7.2 Coleção: Users

```javascript
{
  _id: ObjectId,
  email: String (indexed, unique),
  passwordHash: String,
  nome: String,
  empresa: String,
  telefone: String,
  role: String, // admin, premium, basic
  creditos: Number,
  creditosExpiram: Date,
  alertas: [{
    nome: String,
    filtros: Object,
    ativo: Boolean,
    frequencia: String // daily, weekly
  }],
  createdAt: Date,
  lastLogin: Date,
  emailVerificado: Boolean
}
```

### 7.3 Coleção: Transactions

```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  tipo: String, // compra_creditos, consumo_lead
  valor: Decimal,
  creditos: Number,
  descricao: String,
  formaPagamento: String,
  status: String, // pending, completed, failed
  metadata: Object,
  createdAt: Date (indexed)
}
```

### 7.4 Coleção: LeadExports

```javascript
{
  _id: ObjectId,
  userId: ObjectId (indexed),
  filtros: Object,
  quantidadeLeads: Number,
  creditosUsados: Number,
  formato: String, // csv, excel, json
  campos: [String],
  downloadUrl: String,
  expiresAt: Date,
  createdAt: Date (indexed)
}
```

### 7.5 Coleção: ImportLogs

```javascript
{
  _id: ObjectId,
  dataImportacao: Date (indexed),
  registrosProcessados: Number,
  registrosNovos: Number,
  registrosAtualizados: Number,
  erros: Number,
  detalhesErros: [String],
  tempoProcessamento: Number, // segundos
  status: String, // success, partial, failed
  arquivoFonte: String
}
```

### 7.6 Índices Principais

```javascript
// Companies
db.companies.createIndex({ cnpj: 1 }, { unique: true })
db.companies.createIndex({ estado: 1, cidade: 1 })
db.companies.createIndex({ cnaesPrincipal: 1 })
db.companies.createIndex({ dataAbertura: -1 })
db.companies.createIndex({ updatedAt: -1 })
db.companies.createIndex({ situacaoCadastral: 1 })
db.companies.createIndex({ porte: 1 })

// Índice composto para buscas complexas
db.companies.createIndex({ 
  estado: 1, 
  cnaesPrincipal: 1, 
  dataAbertura: -1 
})

// Users
db.users.createIndex({ email: 1 }, { unique: true })

// Transactions
db.transactions.createIndex({ userId: 1, createdAt: -1 })

// LeadExports
db.leadExports.createIndex({ userId: 1, createdAt: -1 })
db.leadExports.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
```

---

## 8. Fluxos do Sistema

### 8.1 Fluxo de Importação Mensal

1. Worker inicia execução (scheduled - 03:00 AM do ultimo dia do mes)
2. Faz download do arquivo de dados da Receita Federal
3. Valida integridade do arquivo (checksum)
4. Processa arquivo em lotes de 10.000 registros por Stream
5. Para cada registro:
   - Valida CNPJ
   - Normaliza dados
   - Verifica se empresa já existe (upsert)
   - Registra no histórico se houver alterações
6. Registra log de importação


### 8.2 Fluxo de Busca e Compra de Leads

1. Usuário acessa página de busca
2. Define filtros desejados
3. Sistema consulta MongoDB (com cache)
4. Exibe preview dos resultados (primeiros 10)
5. Usuário seleciona quantidade de leads
6. Sistema calcula valor baseado em créditos
7. Verifica créditos disponíveis:
   - Se suficientes: prossegue para confirmação
   - Se insuficientes: redireciona para compra de créditos
8. Usuário confirma compra
9. Sistema:
   - Debita créditos
   - Gera arquivo de export (job assíncrono)
   - Registra transação
   - Envia email com link de download
10. Arquivo disponível por 30 dias



---

## 9. Segurança e Conformidade

### 9.1 Segurança da Aplicação

**Autenticação:**
- JWT com refresh token
- Expiração de 4h para access token
- Rotação de tokens a cada renovação

**Autorização:**
- Role-based access control (RBAC)
- Validação de permissões em cada endpoint
- Segregação de dados por usuário

**Proteções:**
- Rate limiting: 100 req/min por IP
- Validação de entrada em todos os endpoints
- Sanitização de queries


### 9.2 LGPD e Privacidade

**Dados Tratados:**
- Sistema trabalha com dados públicos de empresas (CNPJ)
- Dados pessoais limitados a usuários da plataforma

**Direitos dos Usuários:**
- Acesso aos próprios dados
- Correção de dados cadastrais
- Exclusão de conta (direito ao esquecimento)
- Portabilidade de dados

**Medidas de Conformidade:**
- Termos de uso explícitos
- Política de privacidade clara
- Registro de operações de tratamento


### 9.3 Backup e Recuperação

**Estratégia de Backup:**
- Backup incremental a cada 6 horas
- Backup completo semanal
- Retenção de 30 dias
- Armazenamento em região geográfica diferente
- Criptografia AES-256 dos backups

**Testes de Recuperação:**
- Teste mensal de restore
- Documentação de procedimentos
- RTO: 4 horas
- RPO: 6 horas

---

## 10. Integrações

### 10.1 Gateway de Pagamento
- Paypal
- Webhooks para confirmação automática
- Suporte a cartão, PIX e boleto

### 10.2 Serviço de Email
- MimeKit
- Templates transacionais
- Tracking de aberturas e cliques




---

## 11. Roadmap de Desenvolvimento

### Fase 1 - MVP (3 meses)
- Importação manual de dados
- CRUD de empresas
- Sistema de usuários e autenticação
- Busca básica com filtros
- Sistema de créditos
- Exportação CSV
- Pagamento via PIX

### Fase 2 - Automação (2 meses)
- Importação automática diária
- Worker de processamento
- Exportação múltiplos formatos
- Dashboard administrativo
- API pública básica

### Fase 3 - Escala (2 meses)
- Otimizações de performance
- Cache distribuído
- Painel analytics avançado

### Fase 4 - Features Premium (ongoing)
- Enriquecimento de dados (redes sociais)
- Score de qualidade de leads
- Integração com CRMs
- Machine learning para recomendações
- App mobile

---




## Conclusão

Esta documentação serve como base para o desenvolvimento do sistema de leads da Receita Federal. Deve ser atualizada conforme o projeto evolui e novos requisitos são identificados.

**Próximos Passos:**
1. Validação dos requisitos com stakeholders
2. Definição de cronograma detalhado
3. Setup do ambiente de desenvolvimento
4. Início do desenvolvimento do MVP
5. Testes de integração com fonte de dados da Receita