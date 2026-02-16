# 🔍 Sistema de Pesquisa de Produtos - Tabela de Preços

Sistema completo e interativo para gerenciamento e consulta de produtos estéticos com múltiplas tabelas de preços, visualização para clientes e funcionalidades avançadas de edição.

![Status](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/versão-2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Demonstração](#-demonstração)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

Sistema web desenvolvido para facilitar a consulta e apresentação de produtos estéticos com diferentes tabelas de preços. Ideal para profissionais da área que precisam consultar rapidamente preços e preparar apresentações personalizadas para clientes.

### ✨ Destaques

- 🔐 **Dois Modos de Visualização**: Modo Interno (completo) e Modo Cliente (simplificado)
- 📊 **Múltiplas Visualizações**: Tabela, Cards e Visualização Personalizada
- ✏️ **Edição em Tempo Real**: Edite preços diretamente na interface
- ➕ **Adicionar Produtos**: Adicione novos produtos dinamicamente
- 📋 **Sistema de Cópia**: Copie informações individuais ou todos os produtos de uma vez
- 🎯 **Apresentação para Cliente**: Selecione produtos e gere apresentações customizadas
- 💾 **Persistência Local**: Todos os dados salvos automaticamente no navegador

## 🚀 Funcionalidades

### 🔍 Pesquisa e Filtros
- Busca em tempo real por nome do produto
- Filtros por tabela de preços (Tabela 1, 2, 3 ou Todas)
- Destaque automático dos termos pesquisados
- Normalização de texto (ignora acentos)

### 📊 Visualizações

#### 1️⃣ Modo Tabela
- Visualização completa com todas as tabelas
- Colunas organizadas: Produto, PIX e Parcelado para cada tabela
- Seleção múltipla de produtos via checkbox
- Ordenação e navegação fácil

#### 2️⃣ Modo Cards
- Cards individuais para cada produto
- Exibe todas as tabelas disponíveis
- Botão de copiar informações em cada card
- Layout responsivo em grid

#### 3️⃣ Modo Cliente
- Visualização simplificada e elegante
- Mostra apenas o menor preço de cada tipo
- Design otimizado para apresentação
- Fácil compartilhamento de informações

### ✏️ Sistema de Edição
- **Modo de Edição**: Edite todos os preços diretamente
- **Validação em Tempo Real**: Campos editáveis com feedback visual
- **Salvar/Cancelar**: Controle total sobre as alterações
- **Backup Automático**: Dados salvos no localStorage

### ➕ Adicionar Produtos
- **Modal Intuitivo**: Interface limpa para adicionar novos produtos
- **Campos Organizados**: Separação por tabelas (1, 2 e 3)
- **Validação Completa**:
  - Nome obrigatório
  - Verificação de duplicatas
  - Conversão automática para maiúsculas
- **Feedback Visual**: Mensagens de sucesso/erro
- **Atalhos**: Suporte para tecla Enter

### 🎯 Preparar para Cliente
1. **Selecione Produtos**: Use os checkboxes para selecionar
2. **Configure Tabelas**: Escolha qual tabela mostrar para cada produto
3. **Gere Visualização**: Crie apresentação personalizada
4. **Copie Tudo**: Botão para copiar todos os produtos formatados

### 📋 Sistema de Cópia Avançado

#### Copiar Individual
- Botão em cada card
- Formato organizado com emojis
- Feedback visual de "Copiado!"

#### Copiar Todos os Itens
- Disponível na visualização personalizada para cliente
- Copia todos os produtos selecionados de uma vez
- Formato profissional com separadores
- Contagem de produtos copiados

**Formato de Cópia:**
```
💎 PRODUTOS SELECIONADOS
Preços especiais para você

═══════════════════════════════

📦 RESTYLANE KYSSE
💚 PIX: R$ 479,00
💳 Parcelado: R$ 519,00

───────────────────────────────

📦 SCULPTRA
💚 PIX: R$ 1.110,00
💳 Parcelado: R$ 1.145,00

═══════════════════════════════
```

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização moderna com gradientes e animações
- **JavaScript (Vanilla)**: Lógica e interatividade
- **LocalStorage**: Persistência de dados
- **Responsive Design**: Totalmente adaptável a mobile

### 📦 Sem Dependências Externas
- ✅ Não requer frameworks
- ✅ Não precisa de instalação
- ✅ Funciona offline (após primeiro carregamento)
- ✅ Leve e rápido

## 📥 Como Usar

### Opção 1: Download Direto

1. **Baixe os arquivos**:
   - `pesquisa-produtos.html` (ou `index.html`)
   - `pesquisa-produtos.js`

2. **Coloque na mesma pasta**

3. **Abra o arquivo HTML** no navegador

### Opção 2: GitHub Pages

1. **Fork este repositório**

2. **Vá em Settings > Pages**

3. **Selecione a branch `main`** e salve

4. **Acesse**: `https://seu-usuario.github.io/nome-do-repo`

### Opção 3: Servidor Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pesquisa-produtos.git

# Entre na pasta
cd pesquisa-produtos

# Inicie um servidor local (Python)
python -m http.server 8000

# Ou use Node.js
npx http-server

# Acesse no navegador
http://localhost:8000
```

## 📂 Estrutura do Projeto

```
pesquisa-produtos/
├── index.html              # Arquivo HTML principal
├── pesquisa-produtos.js    # Lógica JavaScript
└── README.md              # Documentação
```

### 🗂️ Estrutura de Dados

```javascript
{
  produto: "NOME DO PRODUTO",
  t1_pix: "R$ 000,00",
  t1_parcelado: "R$ 000,00",
  t2_pix: "R$ 000,00",
  t2_parcelado: "R$ 000,00",
  t3_pix: "R$ 000,00",
  t3_parcelado: "R$ 000,00"
}
```

## 🎨 Demonstração

### Tela Principal
- Interface moderna com gradiente roxo
- Busca em destaque
- Filtros de tabela acessíveis

### Modo Interno
- Visualização completa de todas as tabelas
- Sistema de seleção de produtos
- Edição inline de preços

### Modo Cliente
- Interface limpa e profissional
- Foco nos produtos selecionados
- Botão destacado "Copiar Todos os Itens"

### Modal de Adicionar Produto
- Formulário organizado por tabelas
- Validação em tempo real
- Design responsivo

## 🔧 Configuração

### Adicionar Produtos Iniciais

Edite o array `produtos` no arquivo `pesquisa-produtos.js`:

```javascript
const produtos = [
    { 
        produto: "NOME DO PRODUTO", 
        t1_pix: "R$ 000,00", 
        t1_parcelado: "R$ 000,00",
        t2_pix: "R$ 000,00", 
        t2_parcelado: "R$ 000,00",
        t3_pix: "-", 
        t3_parcelado: "-"
    },
    // ... mais produtos
];
```

### Personalizar Cores

As cores principais estão definidas no CSS:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Cor de destaque */
color: #667eea;

/* Cor de sucesso */
background: #27ae60;
```

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:

- 📱 **Mobile**: Layout em coluna única, botões em largura total
- 💻 **Tablet**: Grid adaptativo, 2 colunas
- 🖥️ **Desktop**: Grid completo, múltiplas colunas

### Breakpoints

```css
@media (max-width: 768px) {
    /* Estilos mobile */
}
```

## 🔐 Segurança e Privacidade

- ✅ **100% Local**: Dados salvos apenas no navegador do usuário
- ✅ **Sem Backend**: Não envia informações para servidores
- ✅ **Sem Cookies**: Usa apenas localStorage
- ✅ **LGPD Compliant**: Dados não compartilhados

## 🐛 Solução de Problemas

### Dados não salvam
- Verifique se o navegador permite localStorage
- Limpe o cache e recarregue a página
- Verifique se está em modo anônimo (não salva localStorage)

### Layout quebrado
- Certifique-se de que ambos os arquivos estão na mesma pasta
- Verifique se o JavaScript está carregando corretamente
- Limpe o cache do navegador

### Botões não funcionam
- Verifique o console do navegador (F12)
- Confirme que o JavaScript está habilitado
- Recarregue a página com Ctrl+F5

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. **Fork o projeto**
2. **Crie uma branch** (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit suas mudanças** (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push para a branch** (`git push origin feature/NovaFuncionalidade`)
5. **Abra um Pull Request**

### 💡 Ideias para Contribuir
- Adicionar mais opções de exportação (PDF, Excel)
- Implementar sistema de categorias
- Adicionar gráficos de preços
- Criar sistema de histórico de alterações
- Implementar dark mode

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Autor

**Seu Nome**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Inspirado nas necessidades do mercado estético
- Desenvolvido com foco em usabilidade e praticidade
- Testado por profissionais da área

---

⭐ Se este projeto te ajudou, considere dar uma estrela!

**Desenvolvido com 💜 para profissionais da estética**
