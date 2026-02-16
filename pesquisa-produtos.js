// ===== SISTEMA DE AUTENTICAÇÃO =====
// CONFIGURAÇÃO DA SENHA - ALTERE AQUI
const SENHA_ACESSO = "estetica2024"; // ⚠️ ALTERE ESTA SENHA!

// Verificar se já está autenticado
function verificarAutenticacao() {
    const autenticado = sessionStorage.getItem('authenticated');
    if (autenticado === 'true') {
        document.getElementById('loginOverlay').classList.add('hidden');
        return true;
    }
    return false;
}

// Processar login
function processarLogin(event) {
    event.preventDefault();
    
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const senha = passwordInput.value;
    
    if (senha === SENHA_ACESSO) {
        // Login bem-sucedido
        sessionStorage.setItem('authenticated', 'true');
        document.getElementById('loginOverlay').classList.add('hidden');
        loginError.classList.remove('show');
        passwordInput.classList.remove('error');
        
        // Inicializar sistema após login
        inicializarSistema();
        
        // Foco no campo de pesquisa após login
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.focus();
        }, 100);
    } else {
        // Senha incorreta
        loginError.classList.add('show');
        passwordInput.classList.add('error');
        passwordInput.value = '';
        passwordInput.focus();
        
        // Remover classe de erro após animação
        setTimeout(() => {
            passwordInput.classList.remove('error');
        }, 500);
    }
}

// Função para inicializar o sistema completo
function inicializarSistema() {
    // Renderizar tabela inicial
    renderTable();
}

// ===== FIM DO SISTEMA DE AUTENTICAÇÃO =====

// Dados dos produtos
const produtos = [
    { produto: "RESTYLANE", t1_pix: "R$ 255,00", t1_parcelado: "R$ 279,00", t2_pix: "R$ 246,00", t2_parcelado: "R$ 269,00", t3_pix: "-", t3_parcelado: "-" },
    { produto: "RESTYLANE LYFT", t1_pix: "R$ 390,00", t1_parcelado: "R$ 429,00", t2_pix: "R$ 375,00", t2_parcelado: "R$ 409,00", t3_pix: "-", t3_parcelado: "-" },
    { produto: "RESTYLANE KYSSE", t1_pix: "R$ 479,00", t1_parcelado: "R$ 519,00", t2_pix: "R$ 459,00", t2_parcelado: "R$ 499,00", t3_pix: "R$ 429,00", t3_parcelado: "R$ 459,00" },
    { produto: "RESTYLANE DEFYNE LIDO", t1_pix: "R$ 489,00", t1_parcelado: "R$ 529,00", t2_pix: "R$ 469,00", t2_parcelado: "R$ 509,00", t3_pix: "R$ 439,00", t3_parcelado: "R$ 469,00" },
    { produto: "RESTYLANE SHAYPE LIDO", t1_pix: "R$ 557,00", t1_parcelado: "R$ 579,00", t2_pix: "R$ 536,00", t2_parcelado: "R$ 559,00", t3_pix: "R$ 509,00", t3_parcelado: "R$ 539,00" },
    { produto: "RESTYLANE SKINBOOSTER VITAL", t1_pix: "R$ 399,00", t1_parcelado: "R$ 439,00", t2_pix: "R$ 387,00", t2_parcelado: "R$ 419,00", t3_pix: "R$ 379,00", t3_parcelado: "R$ 409,00" },
    { produto: "SCULPTRA", t1_pix: "R$ 1.110,00", t1_parcelado: "R$ 1.145,00", t2_pix: "R$ 999,00", t2_parcelado: "R$ 1.099,00", t3_pix: "R$ 949,00", t3_parcelado: "R$ 999,00" },
    { produto: "SCULPTRA 2 FRASCOS", t1_pix: "R$ 1.975,00", t1_parcelado: "R$ 2.157,00", t2_pix: "R$ 1.935,00", t2_parcelado: "R$ 2.099,00", t3_pix: "R$ 1.839,00", t3_parcelado: "R$ 1.959,00" },
    { produto: "BELOTERO BALANCE", t1_pix: "R$ 279,00", t1_parcelado: "R$ 279,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 259,00", t3_parcelado: "R$ 269,00" },
    { produto: "BELOTERO INTENSE", t1_pix: "R$ 289,00", t1_parcelado: "R$ 289,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 259,00", t3_parcelado: "R$ 269,00" },
    { produto: "RADIESSE DUO 1,5", t1_pix: "R$ 799,00", t1_parcelado: "R$ 799,00", t2_pix: "", t2_parcelado: "", t3_pix: "", t3_parcelado: "" },
    { produto: "RADIESSE DUO 3,0", t1_pix: "R$ 1.299,00", t1_parcelado: "R$ 1.299,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 1.299,00", t3_parcelado: "R$ 1.299,00" },
    { produto: "BIOGELIS GLOBAL", t1_pix: "R$ 449,00", t1_parcelado: "R$ 459,00", t2_pix: "R$ 425,00", t2_parcelado: "R$ 445,00", t3_pix: "R$ 390,00", t3_parcelado: "R$ 399,00" },
    { produto: "BIOGELIS VOLUME", t1_pix: "R$ 455,00", t1_parcelado: "R$ 469,00", t2_pix: "R$ 435,00", t2_parcelado: "R$ 450,00", t3_pix: "R$ 400,00", t3_parcelado: "R$ 410,00" },
    { produto: "BIOGELIS VOLUMAX", t1_pix: "R$ 679,00", t1_parcelado: "R$ 699,00", t2_pix: "R$ 655,00", t2_parcelado: "R$ 669,00", t3_pix: "R$ 620,00", t3_parcelado: "R$ 635,00" },
    { produto: "EVOFILL ULTRA DEEP", t1_pix: "R$ 219,00", t1_parcelado: "R$ 219,00", t2_pix: "R$ 199,00", t2_parcelado: "R$ 199,00", t3_pix: "", t3_parcelado: "" },
    { produto: "EVOFILL CONTOUR S", t1_pix: "R$ 1.360,00", t1_parcelado: "R$ 1.360,00", t2_pix: "R$ 1.280,00", t2_parcelado: "R$ 1.280,00", t3_pix: "R$ 1.199,00", t3_parcelado: "R$ 1.199,00" },
    { produto: "EVOFILL CONTOUR H", t1_pix: "R$ 1.360,00", t1_parcelado: "R$ 1.360,00", t2_pix: "R$ 1.280,00", t2_parcelado: "R$ 1.280,00", t3_pix: "R$ 1.199,00", t3_parcelado: "R$ 1.199,00" },
    { produto: "EVO TRIPLE 1 VIAL X 3 ML PDRN", t1_pix: "R$ 199,00", t1_parcelado: "R$ 199,00", t2_pix: "R$ 189,00", t2_parcelado: "R$ 189,00", t3_pix: "R$ 179,00", t3_parcelado: "R$ 179,00" },
    { produto: "EVOSCULPT 300 MG", t1_pix: "R$ 340,00", t1_parcelado: "R$ 340,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 279,00", t3_parcelado: "R$ 299,00" },
    { produto: "NEURAMIS DEEP", t1_pix: "R$ 189,00", t1_parcelado: "R$ 199,00", t2_pix: "R$ 179,00", t2_parcelado: "R$ 189,00", t3_pix: "R$ 169,00", t3_parcelado: "R$ 179,00" },
    { produto: "NEURAMIS VOLUME", t1_pix: "R$ 189,00", t1_parcelado: "R$ 199,00", t2_pix: "R$ 179,00", t2_parcelado: "R$ 189,00", t3_pix: "R$ 169,00", t3_parcelado: "R$ 179,00" },
    { produto: "YVOIRE CONTOUR S", t1_pix: "R$ 285,00", t1_parcelado: "R$ 285,00", t2_pix: "R$ 269,00", t2_parcelado: "R$ 269,00", t3_pix: "R$ 239,00", t3_parcelado: "R$ 239,00" },
    { produto: "YVOIRE VOLUME", t1_pix: "R$ 275,00", t1_parcelado: "R$ 285,00", t2_pix: "R$ 259,00", t2_parcelado: "R$ 259,00", t3_pix: "", t3_parcelado: "" },
    { produto: "SAYPHA FILLER", t1_pix: "R$ 229,00", t1_parcelado: "R$ 249,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 219,00", t3_parcelado: "R$ 239,00" },
    { produto: "SAYPHA VOLUME", t1_pix: "R$ 239,00", t1_parcelado: "R$ 259,00", t2_pix: "R$ 229,00", t2_parcelado: "R$ 249,00", t3_pix: "R$ 209,00", t3_parcelado: "R$ 219,00" },
    { produto: "SAYPHA VOLUME PLUS", t1_pix: "R$ 265,00", t1_parcelado: "R$ 285,00", t2_pix: "R$ 255,00", t2_parcelado: "R$ 275,00", t3_pix: "R$ 229,00", t3_parcelado: "R$ 249,00" },
    { produto: "NUTRIEX", t1_pix: "R$ 296,00", t1_parcelado: "R$ 329,00", t2_pix: "R$ 279,00", t2_parcelado: "R$ 299,00", t3_pix: "R$ 235,00", t3_parcelado: "R$ 255,00" },
    { produto: "RENNOVA DEEP LINE", t1_pix: "R$ 259,00", t1_parcelado: "R$ 279,00", t2_pix: "R$ 239,00", t2_parcelado: "R$ 249,00", t3_pix: "R$ 209,00", t3_parcelado: "R$ 229,00" },
    { produto: "RENNOVA DIAMOND INTENSE", t1_pix: "R$ 479,00", t1_parcelado: "R$ 499,00", t2_pix: "R$ 469,00", t2_parcelado: "R$ 509,00", t3_pix: "R$ 409,00", t3_parcelado: "R$ 429,00" },
    { produto: "RENNOVA ELLEVA 150", t1_pix: "R$ 549,00", t1_parcelado: "R$ 579,00", t2_pix: "R$ 499,00", t2_parcelado: "R$ 509,00", t3_pix: "R$ 459,00", t3_parcelado: "R$ 499,00" },
    { produto: "RENNOVA ELLEVA 210", t1_pix: "R$ 799,00", t1_parcelado: "R$ 809,00", t2_pix: "R$ 789,00", t2_parcelado: "R$ 799,00", t3_pix: "R$ 749,00", t3_parcelado: "R$ 789,00" },
    { produto: "RENNOVA ELLEVA X", t1_pix: "R$ 2.100,00", t1_parcelado: "R$ 2.150,00", t2_pix: "R$ 1.939,00", t2_parcelado: "R$ 1.979,00", t3_pix: "R$ 1.849,00", t3_parcelado: "R$ 1.999,00" },
    { produto: "RENNOVA FILL", t1_pix: "R$ 189,00", t1_parcelado: "R$ 199,00", t2_pix: "R$ 179,00", t2_parcelado: "R$ 189,00", t3_pix: "R$ 159,00", t3_parcelado: "R$ 169,00" },
    { produto: "RENNOVA RBS", t1_pix: "R$ 369,00", t1_parcelado: "R$ 399,00", t2_pix: "R$ 329,00", t2_parcelado: "R$ 349,00", t3_pix: "R$ 289,00", t3_parcelado: "R$ 309,00" },
    { produto: "RENNOVA LIFT PLUS", t1_pix: "R$ 289,00", t1_parcelado: "R$ 309,00", t2_pix: "R$ 269,00", t2_parcelado: "R$ 289,00", t3_pix: "R$ 229,00", t3_parcelado: "R$ 249,00" },
    { produto: "RENNOVA LIFT", t1_pix: "R$ 209,00", t1_parcelado: "R$ 224,00", t2_pix: "R$ 189,00", t2_parcelado: "R$ 199,00", t3_pix: "R$ 169,00", t3_parcelado: "R$ 179,00" },
    { produto: "RENNOVA ULTRA VOLUME 2ML", t1_pix: "R$ 449,00", t1_parcelado: "R$ 489,00", t2_pix: "R$ 429,00", t2_parcelado: "R$ 439,00", t3_pix: "R$ 389,00", t3_parcelado: "R$ 409,00" },
    { produto: "RENNOVA LIPS PLUS LIDO", t1_pix: "R$ 299,00", t1_parcelado: "R$ 339,00", t2_pix: "R$ 289,00", t2_parcelado: "R$ 319,00", t3_pix: "R$ 269,00", t3_parcelado: "R$ 289,00" },
    { produto: "TOXINA XEOMIN", t1_pix: "R$ 590,00", t1_parcelado: "R$ 609,00", t2_pix: "R$ 579,00", t2_parcelado: "R$ 599,00", t3_pix: "R$ 579,00", t3_parcelado: "R$ 599,00" },
    { produto: "DYSPORT 500", t1_pix: "R$ 1.333,00", t1_parcelado: "R$ 1.380,00", t2_pix: "R$ 1.312,00", t2_parcelado: "R$ 1.380,00", t3_pix: "", t3_parcelado: "" },
    { produto: "DYSPORT 300", t1_pix: "R$ 917,00", t1_parcelado: "R$ 943,00", t2_pix: "R$ 904,00", t2_parcelado: "R$ 939,00", t3_pix: "", t3_parcelado: "" },
    { produto: "BOTULIFT 200", t1_pix: "R$ 1.099,00", t1_parcelado: "R$ 1.189,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 989,00", t3_parcelado: "R$ 1.029,00" },
    { produto: "BOTULIM 50", t1_pix: "R$ 479,00", t1_parcelado: "R$ 499,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 479,00", t3_parcelado: "R$ 499,00" },
    { produto: "BOTULIM 100", t1_pix: "R$ 599,00", t1_parcelado: "R$ 609,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 589,00", t3_parcelado: "R$ 599,00" },
    { produto: "BOTULIM 200", t1_pix: "R$ 989,00", t1_parcelado: "R$ 1.049,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 999,00", t3_parcelado: "R$ 1.049,00" },
    { produto: "LETYBO 200", t1_pix: "R$ 999,00", t1_parcelado: "R$ 1.049,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 999,00", t3_parcelado: "R$ 1.049,00" },
    { produto: "NABOTA 100U", t1_pix: "R$ 719,00", t1_parcelado: "R$ 739,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 549,00", t3_parcelado: "R$ 569,00" },
    { produto: "FIO ESPICULADO BARB BI (Agulhado) 19G100mm c/ 4un MEDITHREAD", t1_pix: "R$ 249,00", t1_parcelado: "R$ 279,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 199,00", t3_parcelado: "R$ 209,00" },
    { produto: "FIO SCREW 29G40MM c/ 10un MEDITHREAD", t1_pix: "R$ 295,00", t1_parcelado: "R$ 305,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 269,00", t3_parcelado: "R$ 279,00" },
    { produto: "FIO CANULA L NOSE 19G40mm c/ 4un MEDITHREAD", t1_pix: "R$ 249,00", t1_parcelado: "R$ 279,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 229,00", t3_parcelado: "R$ 239,00" },
    { produto: "FIO MOLDADO MOLD (Canula W) 18G100mm c/ 4un ALUR", t1_pix: "R$ 429,00", t1_parcelado: "R$ 479,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 469,00", t3_parcelado: "R$ 499,00" },
    { produto: "FIO MONO HYDRA PLUS (Canula L) 21G38mm c/ 4un ALUR", t1_pix: "R$ 309,00", t1_parcelado: "R$ 339,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 329,00", t3_parcelado: "R$ 349,00" },
    { produto: "FIO ESPICULADO CUTTING COG (Canula L) 19G100mm c/ 4un ALUR", t1_pix: "Estoque Zerado", t1_parcelado: "Estoque Zerado", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 269,00", t3_parcelado: "R$ 289,00" },
    { produto: "FIO MONO (Canula L) 30G38mm c/ 10un ALUR", t1_pix: "R$ 309,00", t1_parcelado: "R$ 349,00", t2_pix: "", t2_parcelado: "", t3_pix: "R$ 339,00", t3_parcelado: "R$ 349,00" }
];

// Variáveis globais
let filteredProducts = [...produtos];
let currentTableFilter = 'all';
let isEditMode = false;
let isClientMode = false;
let editedProducts = null;
let selectedProducts = new Set();
let productTableConfig = {}; // Armazena qual tabela mostrar para cada produto

// Carregar produtos salvos do localStorage
function loadSavedProducts() {
    const saved = localStorage.getItem('produtosData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            produtos.length = 0;
            produtos.push(...parsed);
        } catch (e) {
            console.error('Erro ao carregar dados salvos:', e);
        }
    }
}

// Salvar produtos no localStorage
function saveProducts() {
    localStorage.setItem('produtosData', JSON.stringify(produtos));
}

// Inicializar produtos salvos
loadSavedProducts();

// Função para normalizar texto (remover acentos e converter para minúsculas)
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Função para destacar texto correspondente
function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;
    
    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    const index = normalizedText.indexOf(normalizedSearch);
    
    if (index === -1) return text;
    
    const before = text.substring(0, index);
    const match = text.substring(index, index + searchTerm.length);
    const after = text.substring(index + searchTerm.length);
    
    return `${before}<span class="highlight">${match}</span>${after}`;
}

// Função para criar uma célula de preço
function createPriceCell(price, isPix, field, productIndex) {
    const isEmpty = !price || price === '' || price === '-';
    const isOutOfStock = price === 'Estoque Zerado';

    if (isEditMode) {
        const value = isEmpty || isOutOfStock ? '' : price;
        return `<td class="price">
            <input type="text"
                   value="${value}"
                   data-field="${field}"
                   data-index="${productIndex}"
                   placeholder="-">
        </td>`;
    }

    if (isEmpty) {
        return '<td class="price unavailable">-</td>';
    } else if (isOutOfStock) {
        return '<td class="price unavailable">Estoque Zerado</td>';
    } else {
        const className = isPix ? 'price' : 'price parcelado';
        return `<td class="${className}">${price}</td>`;
    }
}

// Função para verificar se o produto deve ser exibido baseado no filtro de tabela
function shouldShowProduct(produto) {
    if (currentTableFilter === 'all') return true;
    
    const tablePrefix = `t${currentTableFilter}_`;
    const hasPriceInTable = 
        (produto[`${tablePrefix}pix`] && produto[`${tablePrefix}pix`] !== '' && produto[`${tablePrefix}pix`] !== '-') ||
        (produto[`${tablePrefix}parcelado`] && produto[`${tablePrefix}parcelado`] !== '' && produto[`${tablePrefix}parcelado`] !== '-');
    
    return hasPriceInTable;
}

// Função para renderizar a tabela
function renderTable(searchTerm = '') {
    const tableBody = document.getElementById('tableBody');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    
    // Filtrar produtos baseado no termo de pesquisa e no filtro de tabela
    filteredProducts = produtos.filter(produto => {
        const matchesSearch = normalizeText(produto.produto).includes(normalizeText(searchTerm));
        const matchesTable = shouldShowProduct(produto);
        return matchesSearch && matchesTable;
    });
    
    // Atualizar contador
    resultCount.textContent = filteredProducts.length;
    
    // Limpar tabela
    tableBody.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Renderizar produtos filtrados
    filteredProducts.forEach((produto, index) => {
        const row = document.createElement('tr');

        const productNameHighlighted = highlightMatch(produto.produto, searchTerm);
        const productIndex = produtos.indexOf(produto);
        const isSelected = selectedProducts.has(productIndex);

        if (isEditMode) {
            row.innerHTML = `
                <td class="select-column">
                    <input type="checkbox"
                           class="product-checkbox"
                           data-index="${productIndex}"
                           ${isSelected ? 'checked' : ''}>
                </td>
                <td class="product-name">
                    <input type="text"
                           value="${produto.produto}"
                           data-field="produto"
                           data-index="${productIndex}">
                </td>
                ${createPriceCell(produto.t1_pix, true, 't1_pix', productIndex)}
                ${createPriceCell(produto.t1_parcelado, false, 't1_parcelado', productIndex)}
                ${createPriceCell(produto.t2_pix, true, 't2_pix', productIndex)}
                ${createPriceCell(produto.t2_parcelado, false, 't2_parcelado', productIndex)}
                ${createPriceCell(produto.t3_pix, true, 't3_pix', productIndex)}
                ${createPriceCell(produto.t3_parcelado, false, 't3_parcelado', productIndex)}
            `;
        } else {
            row.innerHTML = `
                <td class="select-column">
                    <input type="checkbox"
                           class="product-checkbox"
                           data-index="${productIndex}"
                           ${isSelected ? 'checked' : ''}>
                </td>
                <td class="product-name">${productNameHighlighted}</td>
                ${createPriceCell(produto.t1_pix, true)}
                ${createPriceCell(produto.t1_parcelado, false)}
                ${createPriceCell(produto.t2_pix, true)}
                ${createPriceCell(produto.t2_parcelado, false)}
                ${createPriceCell(produto.t3_pix, true)}
                ${createPriceCell(produto.t3_parcelado, false)}
            `;
        }

        // Event listener para checkbox
        const checkbox = row.querySelector('.product-checkbox');
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedProducts.add(productIndex);
            } else {
                selectedProducts.delete(productIndex);
            }
            updateSelectionControls();
        });

        tableBody.appendChild(row);
    });
}

// Função para formatar texto para copiar
function formatProductForCopy(produto) {
    let text = `📦 ${produto.produto}\n\n`;
    
    // Tabela 1
    if ((produto.t1_pix && produto.t1_pix !== '' && produto.t1_pix !== '-') || 
        (produto.t1_parcelado && produto.t1_parcelado !== '' && produto.t1_parcelado !== '-')) {
        text += `💰 TABELA 1:\n`;
        if (produto.t1_pix && produto.t1_pix !== '' && produto.t1_pix !== '-') {
            text += `   PIX: ${produto.t1_pix}\n`;
        }
        if (produto.t1_parcelado && produto.t1_parcelado !== '' && produto.t1_parcelado !== '-') {
            text += `   Parcelado: ${produto.t1_parcelado}\n`;
        }
        text += `\n`;
    }
    
    // Tabela 2
    if ((produto.t2_pix && produto.t2_pix !== '' && produto.t2_pix !== '-') || 
        (produto.t2_parcelado && produto.t2_parcelado !== '' && produto.t2_parcelado !== '-')) {
        text += `💰 TABELA 2:\n`;
        if (produto.t2_pix && produto.t2_pix !== '' && produto.t2_pix !== '-') {
            text += `   PIX: ${produto.t2_pix}\n`;
        }
        if (produto.t2_parcelado && produto.t2_parcelado !== '' && produto.t2_parcelado !== '-') {
            text += `   Parcelado: ${produto.t2_parcelado}\n`;
        }
        text += `\n`;
    }
    
    // Tabela 3
    if ((produto.t3_pix && produto.t3_pix !== '' && produto.t3_pix !== '-') || 
        (produto.t3_parcelado && produto.t3_parcelado !== '' && produto.t3_parcelado !== '-')) {
        text += `💰 TABELA 3:\n`;
        if (produto.t3_pix && produto.t3_pix !== '' && produto.t3_pix !== '-') {
            text += `   PIX: ${produto.t3_pix}\n`;
        }
        if (produto.t3_parcelado && produto.t3_parcelado !== '' && produto.t3_parcelado !== '-') {
            text += `   Parcelado: ${produto.t3_parcelado}\n`;
        }
    }
    
    return text.trim();
}

// Função para formatar texto de uma tabela específica
function formatSingleTable(produto, tableNumber) {
    const tablePrefix = `t${tableNumber}_`;
    let text = `📦 ${produto.produto}\n\n`;
    text += `💰 TABELA ${tableNumber}:\n`;
    
    const pixPrice = produto[`${tablePrefix}pix`];
    const parceladoPrice = produto[`${tablePrefix}parcelado`];
    
    if (pixPrice && pixPrice !== '' && pixPrice !== '-' && pixPrice !== 'Estoque Zerado') {
        text += `   💚 PIX: ${pixPrice}\n`;
    } else if (pixPrice === 'Estoque Zerado') {
        text += `   ⚠️ Estoque Zerado\n`;
    }
    
    if (parceladoPrice && parceladoPrice !== '' && parceladoPrice !== '-' && parceladoPrice !== 'Estoque Zerado') {
        text += `   💳 Parcelado: ${parceladoPrice}\n`;
    }
    
    return text.trim();
}

// Função para copiar texto para clipboard
async function copyToClipboard(text, button) {
    try {
        await navigator.clipboard.writeText(text);
        
        // Feedback visual
        const originalText = button.textContent;
        button.textContent = '✓ Copiado!';
        button.classList.add('copied');
        
        // Mostrar toast
        showToast('Copiado para área de transferência!');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Erro ao copiar:', err);
        alert('Erro ao copiar. Tente novamente.');
    }
}

// Função para mostrar toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Função para renderizar cards
function renderCards(searchTerm = '') {
    const cardsContainer = document.getElementById('cardView');
    
    // Limpar container
    cardsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        cardsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">😕</div>
                <h2>Nenhum produto encontrado</h2>
                <p>Tente pesquisar com outros termos</p>
            </div>
        `;
        return;
    }
    
    // Renderizar cards
    filteredProducts.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const productNameHighlighted = highlightMatch(produto.produto, searchTerm);
        
        let tablesHTML = '';
        
        // Tabela 1
        if ((produto.t1_pix && produto.t1_pix !== '' && produto.t1_pix !== '-') || 
            (produto.t1_parcelado && produto.t1_parcelado !== '' && produto.t1_parcelado !== '-')) {
            tablesHTML += `
                <div class="table-section">
                    <div class="table-section-header">
                        <div class="table-section-title">💰 TABELA 1</div>
                        <button class="copy-btn-small" onclick='copySingleTable(${JSON.stringify(produto)}, 1, this)'>
                            📋 Copiar
                        </button>
                    </div>
                    <div class="price-row">
                        <div class="price-item">
                            <div class="price-label">💚 PIX</div>
                            <div class="price-value pix">${produto.t1_pix && produto.t1_pix !== '' && produto.t1_pix !== '-' ? produto.t1_pix : '-'}</div>
                        </div>
                        <div class="price-item">
                            <div class="price-label">💳 Parcelado</div>
                            <div class="price-value parcelado">${produto.t1_parcelado && produto.t1_parcelado !== '' && produto.t1_parcelado !== '-' ? produto.t1_parcelado : '-'}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Tabela 2
        if ((produto.t2_pix && produto.t2_pix !== '' && produto.t2_pix !== '-') || 
            (produto.t2_parcelado && produto.t2_parcelado !== '' && produto.t2_parcelado !== '-')) {
            tablesHTML += `
                <div class="table-section">
                    <div class="table-section-header">
                        <div class="table-section-title">💰 TABELA 2</div>
                        <button class="copy-btn-small" onclick='copySingleTable(${JSON.stringify(produto)}, 2, this)'>
                            📋 Copiar
                        </button>
                    </div>
                    <div class="price-row">
                        <div class="price-item">
                            <div class="price-label">💚 PIX</div>
                            <div class="price-value pix">${produto.t2_pix && produto.t2_pix !== '' && produto.t2_pix !== '-' ? produto.t2_pix : '-'}</div>
                        </div>
                        <div class="price-item">
                            <div class="price-label">💳 Parcelado</div>
                            <div class="price-value parcelado">${produto.t2_parcelado && produto.t2_parcelado !== '' && produto.t2_parcelado !== '-' ? produto.t2_parcelado : '-'}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Tabela 3
        if ((produto.t3_pix && produto.t3_pix !== '' && produto.t3_pix !== '-') || 
            (produto.t3_parcelado && produto.t3_parcelado !== '' && produto.t3_parcelado !== '-')) {
            tablesHTML += `
                <div class="table-section">
                    <div class="table-section-header">
                        <div class="table-section-title">💰 TABELA 3</div>
                        <button class="copy-btn-small" onclick='copySingleTable(${JSON.stringify(produto)}, 3, this)'>
                            📋 Copiar
                        </button>
                    </div>
                    <div class="price-row">
                        <div class="price-item">
                            <div class="price-label">💚 PIX</div>
                            <div class="price-value pix">${produto.t3_pix && produto.t3_pix !== '' && produto.t3_pix !== '-' ? produto.t3_pix : '-'}</div>
                        </div>
                        <div class="price-item">
                            <div class="price-label">💳 Parcelado</div>
                            <div class="price-value parcelado">${produto.t3_parcelado && produto.t3_parcelado !== '' && produto.t3_parcelado !== '-' ? produto.t3_parcelado : '-'}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        card.innerHTML = `
            <div class="product-card-header">
                <div class="product-card-title">${productNameHighlighted}</div>
            </div>
            <div class="price-grid">
                ${tablesHTML}
            </div>
        `;
        
        cardsContainer.appendChild(card);
    });
}

// Função global para copiar uma tabela específica
window.copySingleTable = function(produto, tableNumber, button) {
    const text = formatSingleTable(produto, tableNumber);
    copyToClipboard(text, button);
}

// Função global para copiar informações do produto
window.copyProductInfo = function(produto, button) {
    const text = formatProductForCopy(produto);
    copyToClipboard(text, button);
}

// Função para formatar preço para cliente (sem mencionar tabelas)
function formatPriceForClient(produto) {
    let text = `📦 ${produto.produto}\n\n`;

    // Coletar todos os preços disponíveis
    const prices = [];

    if (produto.t1_pix && produto.t1_pix !== '' && produto.t1_pix !== '-' && produto.t1_pix !== 'Estoque Zerado') {
        prices.push({ type: 'PIX', value: produto.t1_pix });
    }
    if (produto.t2_pix && produto.t2_pix !== '' && produto.t2_pix !== '-' && produto.t2_pix !== 'Estoque Zerado') {
        prices.push({ type: 'PIX', value: produto.t2_pix });
    }
    if (produto.t3_pix && produto.t3_pix !== '' && produto.t3_pix !== '-' && produto.t3_pix !== 'Estoque Zerado') {
        prices.push({ type: 'PIX', value: produto.t3_pix });
    }

    if (produto.t1_parcelado && produto.t1_parcelado !== '' && produto.t1_parcelado !== '-' && produto.t1_parcelado !== 'Estoque Zerado') {
        prices.push({ type: 'Parcelado', value: produto.t1_parcelado });
    }
    if (produto.t2_parcelado && produto.t2_parcelado !== '' && produto.t2_parcelado !== '-' && produto.t2_parcelado !== 'Estoque Zerado') {
        prices.push({ type: 'Parcelado', value: produto.t2_parcelado });
    }
    if (produto.t3_parcelado && produto.t3_parcelado !== '' && produto.t3_parcelado !== '-' && produto.t3_parcelado !== 'Estoque Zerado') {
        prices.push({ type: 'Parcelado', value: produto.t3_parcelado });
    }

    // Remover duplicatas e ordenar
    const uniquePrices = {};
    prices.forEach(price => {
        if (!uniquePrices[price.type] || price.value < uniquePrices[price.type]) {
            uniquePrices[price.type] = price.value;
        }
    });

    if (uniquePrices['PIX']) {
        text += `💚 PIX: ${uniquePrices['PIX']}\n`;
    }
    if (uniquePrices['Parcelado']) {
        text += `💳 Parcelado: ${uniquePrices['Parcelado']}\n`;
    }

    return text.trim();
}

// Função para renderizar cards para cliente
function renderClientCards(searchTerm = '') {
    const clientView = document.getElementById('clientView');

    // Limpar container
    clientView.innerHTML = '';

    if (filteredProducts.length === 0) {
        clientView.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">😕</div>
                <h2>Nenhum produto encontrado</h2>
                <p>Tente pesquisar com outros termos</p>
            </div>
        `;
        return;
    }

    // Renderizar cards para cliente
    filteredProducts.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'client-card';

        const productNameHighlighted = highlightMatch(produto.produto, searchTerm);

        // Coletar preços únicos (menor preço de cada tipo)
        const pixPrices = [produto.t1_pix, produto.t2_pix, produto.t3_pix]
            .filter(p => p && p !== '' && p !== '-' && p !== 'Estoque Zerado')
            .sort();

        const parceladoPrices = [produto.t1_parcelado, produto.t2_parcelado, produto.t3_parcelado]
            .filter(p => p && p !== '' && p !== '-' && p !== 'Estoque Zerado')
            .sort();

        let pricesHTML = '';

        if (pixPrices.length > 0) {
            pricesHTML += `
                <div class="client-price-item">
                    <span class="client-price-label">💚 PIX</span>
                    <span class="client-price-value pix">${pixPrices[0]}</span>
                </div>
            `;
        }

        if (parceladoPrices.length > 0) {
            pricesHTML += `
                <div class="client-price-item">
                    <span class="client-price-label">💳 Parcelado</span>
                    <span class="client-price-value parcelado">${parceladoPrices[0]}</span>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="client-card-title">${productNameHighlighted}</div>
            <div class="client-prices">
                ${pricesHTML}
            </div>
            <button class="copy-btn" onclick='copyClientPrice(${JSON.stringify(produto)}, this)'>
                📋 Copiar Informações
            </button>
        `;

        clientView.appendChild(card);
    });
}

// Função global para copiar preço para cliente
window.copyClientPrice = function(produto, button) {
    const text = formatPriceForClient(produto);
    copyToClipboard(text, button);
}

// Atualizar controles de seleção
function updateSelectionControls() {
    const selectionControls = document.getElementById('selectionControls');
    const selectedCount = document.getElementById('selectedCount');

    selectedCount.textContent = selectedProducts.size;

    if (selectedProducts.size > 0) {
        selectionControls.classList.add('active');
    } else {
        selectionControls.classList.remove('active');
    }
}

// Abrir modal de configuração
function openConfigModal() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = '';

    // Para cada produto selecionado, criar seção de configuração
    selectedProducts.forEach(index => {
        const produto = produtos[index];
        const configDiv = document.createElement('div');
        configDiv.className = 'config-product';

        // Coletar tabelas disponíveis
        const availableTables = [];

        if ((produto.t1_pix && produto.t1_pix !== '' && produto.t1_pix !== '-') ||
            (produto.t1_parcelado && produto.t1_parcelado !== '' && produto.t1_parcelado !== '-')) {
            availableTables.push({
                id: 1,
                pix: produto.t1_pix,
                parcelado: produto.t1_parcelado
            });
        }

        if ((produto.t2_pix && produto.t2_pix !== '' && produto.t2_pix !== '-') ||
            (produto.t2_parcelado && produto.t2_parcelado !== '' && produto.t2_parcelado !== '-')) {
            availableTables.push({
                id: 2,
                pix: produto.t2_pix,
                parcelado: produto.t2_parcelado
            });
        }

        if ((produto.t3_pix && produto.t3_pix !== '' && produto.t3_pix !== '-') ||
            (produto.t3_parcelado && produto.t3_parcelado !== '' && produto.t3_parcelado !== '-')) {
            availableTables.push({
                id: 3,
                pix: produto.t3_pix,
                parcelado: produto.t3_parcelado
            });
        }

        let tablesHTML = '';
        availableTables.forEach((table, idx) => {
            const isSelected = productTableConfig[index] === table.id || (idx === 0 && !productTableConfig[index]);

            tablesHTML += `
                <div class="table-option ${isSelected ? 'selected' : ''}" onclick="selectTable(${index}, ${table.id}, this)">
                    <input type="radio"
                           name="table_${index}"
                           value="${table.id}"
                           ${isSelected ? 'checked' : ''}>
                    <div>
                        <div class="table-option-header">Tabela ${table.id}</div>
                        <div class="table-option-prices">
                            ${table.pix && table.pix !== '' && table.pix !== '-' ?
                                `<div class="table-option-price">💚 PIX: ${table.pix}</div>` : ''}
                            ${table.parcelado && table.parcelado !== '' && table.parcelado !== '-' ?
                                `<div class="table-option-price">💳 Parcelado: ${table.parcelado}</div>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        configDiv.innerHTML = `
            <div class="config-product-name">${produto.produto}</div>
            <div class="table-selector">
                ${tablesHTML}
            </div>
        `;

        modalBody.appendChild(configDiv);

        // Inicializar configuração padrão
        if (!productTableConfig[index] && availableTables.length > 0) {
            productTableConfig[index] = availableTables[0].id;
        }
    });

    document.getElementById('configModal').classList.add('active');
}

// Selecionar tabela para um produto
window.selectTable = function(productIndex, tableId, element) {
    productTableConfig[productIndex] = tableId;

    // Atualizar visual
    const parent = element.parentElement;
    parent.querySelectorAll('.table-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

// Gerar visualização personalizada para cliente
function generateCustomClientView() {
    const customProductsGrid = document.getElementById('customProductsGrid');
    customProductsGrid.innerHTML = '';

    selectedProducts.forEach(index => {
        const produto = produtos[index];
        const tableId = productTableConfig[index] || 1;
        const tablePrefix = `t${tableId}_`;

        const pixPrice = produto[`${tablePrefix}pix`];
        const parceladoPrice = produto[`${tablePrefix}parcelado`];

        const card = document.createElement('div');
        card.className = 'client-card';

        let pricesHTML = '';

        if (pixPrice && pixPrice !== '' && pixPrice !== '-' && pixPrice !== 'Estoque Zerado') {
            pricesHTML += `
                <div class="client-price-item">
                    <span class="client-price-label">💚 PIX</span>
                    <span class="client-price-value pix">${pixPrice}</span>
                </div>
            `;
        }

        if (parceladoPrice && parceladoPrice !== '' && parceladoPrice !== '-' && parceladoPrice !== 'Estoque Zerado') {
            pricesHTML += `
                <div class="client-price-item">
                    <span class="client-price-label">💳 Parcelado</span>
                    <span class="client-price-value parcelado">${parceladoPrice}</span>
                </div>
            `;
        }

        // Formatar texto para copiar
        let copyText = `📦 ${produto.produto}\n\n`;
        if (pixPrice && pixPrice !== '' && pixPrice !== '-' && pixPrice !== 'Estoque Zerado') {
            copyText += `💚 PIX: ${pixPrice}\n`;
        }
        if (parceladoPrice && parceladoPrice !== '' && parceladoPrice !== '-' && parceladoPrice !== 'Estoque Zerado') {
            copyText += `💳 Parcelado: ${parceladoPrice}\n`;
        }

        card.innerHTML = `
            <div class="client-card-title">${produto.produto}</div>
            <div class="client-prices">
                ${pricesHTML}
            </div>
            <button class="copy-btn" onclick='copyCustomText(\`${copyText.trim()}\`, this)'>
                📋 Copiar Informações
            </button>
        `;

        customProductsGrid.appendChild(card);
    });

    // Fechar modal
    document.getElementById('configModal').classList.remove('active');

    // Mudar para visualização personalizada
    isClientMode = true;
    document.getElementById('clientModeBtn').classList.add('active');
    document.getElementById('internalModeBtn').classList.remove('active');
    document.getElementById('viewToggle').classList.add('hidden');
    document.getElementById('tableView').classList.add('hidden');
    document.getElementById('cardView').classList.add('hidden');
    document.getElementById('clientView').classList.add('hidden');
    document.getElementById('customClientView').classList.remove('hidden');

    showToast('✨ Visualização personalizada gerada!');
}

// Função global para copiar texto customizado
window.copyCustomText = function(text, button) {
    copyToClipboard(text, button);
}

// Função global para copiar todos os produtos da visualização customizada
window.copyAllProducts = function() {
    const button = document.getElementById('copyAllBtn');
    
    // Coletar todos os textos dos produtos selecionados
    let allText = '💎 PRODUTOS SELECIONADOS\nPreços especiais para você\n\n';
    allText += '═══════════════════════════════\n\n';
    
    const productTexts = [];
    
    selectedProducts.forEach(index => {
        const produto = produtos[index];
        const tableId = productTableConfig[index] || 1;
        const tablePrefix = `t${tableId}_`;
        
        const pixPrice = produto[`${tablePrefix}pix`];
        const parceladoPrice = produto[`${tablePrefix}parcelado`];
        
        let productText = `📦 ${produto.produto}\n`;
        
        if (pixPrice && pixPrice !== '' && pixPrice !== '-' && pixPrice !== 'Estoque Zerado') {
            productText += `💚 PIX: ${pixPrice}\n`;
        }
        
        if (parceladoPrice && parceladoPrice !== '' && parceladoPrice !== '-' && parceladoPrice !== 'Estoque Zerado') {
            productText += `💳 Parcelado: ${parceladoPrice}\n`;
        }
        
        productTexts.push(productText);
    });
    
    allText += productTexts.join('\n───────────────────────────────\n\n');
    allText += '\n═══════════════════════════════';
    
    // Copiar para clipboard
    navigator.clipboard.writeText(allText).then(() => {
        // Feedback visual
        const originalText = button.textContent;
        button.textContent = '✓ Copiado!';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
        
        showToast(`✓ ${selectedProducts.size} produtos copiados!`);
    }).catch(err => {
        console.error('Erro ao copiar:', err);
        showToast('❌ Erro ao copiar');
    });
}

// Função para abrir modal de adicionar produto
function openAddProductModal() {
    document.getElementById('addProductModal').classList.add('active');
    document.getElementById('newProductName').focus();
}

// Função para fechar modal de adicionar produto e limpar campos
function closeAddProductModal() {
    document.getElementById('addProductModal').classList.remove('active');
    clearAddProductForm();
}

// Função para limpar formulário
function clearAddProductForm() {
    document.getElementById('newProductName').value = '';
    document.getElementById('newT1Pix').value = '';
    document.getElementById('newT1Parcelado').value = '';
    document.getElementById('newT2Pix').value = '';
    document.getElementById('newT2Parcelado').value = '';
    document.getElementById('newT3Pix').value = '';
    document.getElementById('newT3Parcelado').value = '';
}

// Função para adicionar novo produto
function addNewProduct() {
    const productName = document.getElementById('newProductName').value.trim();
    
    if (!productName) {
        showToast('⚠️ Digite o nome do produto');
        document.getElementById('newProductName').focus();
        return;
    }
    
    // Verificar se o produto já existe
    const productExists = produtos.some(p => 
        p.produto.toLowerCase() === productName.toLowerCase()
    );
    
    if (productExists) {
        showToast('⚠️ Este produto já existe na lista');
        return;
    }
    
    // Criar objeto do novo produto
    const newProduct = {
        produto: productName.toUpperCase(),
        t1_pix: document.getElementById('newT1Pix').value.trim() || '-',
        t1_parcelado: document.getElementById('newT1Parcelado').value.trim() || '-',
        t2_pix: document.getElementById('newT2Pix').value.trim() || '-',
        t2_parcelado: document.getElementById('newT2Parcelado').value.trim() || '-',
        t3_pix: document.getElementById('newT3Pix').value.trim() || '-',
        t3_parcelado: document.getElementById('newT3Parcelado').value.trim() || '-'
    };
    
    // Adicionar ao array
    produtos.push(newProduct);
    
    // Salvar no localStorage
    saveProducts();
    
    // Atualizar visualização
    filteredProducts = [...produtos];
    renderTable();
    
    // Fechar modal
    closeAddProductModal();
    
    // Mostrar mensagem de sucesso
    showToast(`✓ Produto "${productName}" adicionado com sucesso!`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // ===== INICIALIZAR AUTENTICAÇÃO =====
    const jaAutenticado = verificarAutenticacao();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', processarLogin);
    }
    
    // Focar no campo de senha se não estiver autenticado
    if (!jaAutenticado) {
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) passwordInput.focus();
        return; // Não carregar o resto se não estiver autenticado
    }
    // ===== FIM INICIALIZAÇÃO AUTENTICAÇÃO =====
    
    // Se já está autenticado, carregar o sistema
    inicializarSistema();
    
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const cardViewBtn = document.getElementById('cardViewBtn');
    const editModeToggle = document.getElementById('editModeToggle');
    const tableView = document.getElementById('tableView');
    const cardView = document.getElementById('cardView');
    const clientView = document.getElementById('clientView');
    const internalModeBtn = document.getElementById('internalModeBtn');
    const clientModeBtn = document.getElementById('clientModeBtn');
    const viewToggle = document.getElementById('viewToggle');
    const editModeControls = document.getElementById('editModeControls');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const prepareForClientBtn = document.getElementById('prepareForClientBtn');
    const clearSelectionBtn = document.getElementById('clearSelectionBtn');
    const configModal = document.getElementById('configModal');
    const closeModal = document.getElementById('closeModal');
    const cancelConfigBtn = document.getElementById('cancelConfigBtn');
    const confirmConfigBtn = document.getElementById('confirmConfigBtn');
    const customClientView = document.getElementById('customClientView');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductModal = document.getElementById('addProductModal');
    const closeAddProductModalBtn = document.getElementById('closeAddProductModal');
    const cancelAddProductBtn = document.getElementById('cancelAddProductBtn');
    const confirmAddProductBtn = document.getElementById('confirmAddProductBtn');
    
    // Pesquisa em tempo real
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value;
        renderTable(searchTerm);

        // Se estiver na visualização de cards, atualizar também
        if (!cardView.classList.contains('hidden')) {
            renderCards(searchTerm);
        }

        // Se estiver no modo cliente, atualizar também
        if (isClientMode && !clientView.classList.contains('hidden')) {
            renderClientCards(searchTerm);
        }
    });
    
    // Filtros de tabela
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Adicionar classe active ao botão clicado
            this.classList.add('active');

            // Atualizar filtro atual
            currentTableFilter = this.getAttribute('data-table');

            // Renderizar com o novo filtro
            const searchTerm = searchInput.value;
            renderTable(searchTerm);

            // Se estiver na visualização de cards, atualizar também
            if (!cardView.classList.contains('hidden')) {
                renderCards(searchTerm);
            }

            // Se estiver no modo cliente, atualizar também
            if (isClientMode && !clientView.classList.contains('hidden')) {
                renderClientCards(searchTerm);
            }
        });
    });
    
    // Alternar entre visualização de tabela e cards
    tableViewBtn.addEventListener('click', function() {
        tableViewBtn.classList.add('active');
        cardViewBtn.classList.remove('active');
        tableView.classList.remove('hidden');
        cardView.classList.add('hidden');
    });
    
    cardViewBtn.addEventListener('click', function() {
        cardViewBtn.classList.add('active');
        tableViewBtn.classList.remove('active');
        cardView.classList.remove('hidden');
        tableView.classList.add('hidden');
        
        // Renderizar cards pela primeira vez ou atualizar
        renderCards(searchInput.value);
    });
    
    // Alternar entre modo interno e modo cliente
    internalModeBtn.addEventListener('click', function() {
        isClientMode = false;
        internalModeBtn.classList.add('active');
        clientModeBtn.classList.remove('active');

        // Mostrar controles de visualização interna
        viewToggle.classList.remove('hidden');

        // Esconder visualizações do cliente
        clientView.classList.add('hidden');
        customClientView.classList.add('hidden');

        // Mostrar visualização atual (tabela ou cards internos)
        if (tableViewBtn.classList.contains('active')) {
            tableView.classList.remove('hidden');
            cardView.classList.add('hidden');
        } else if (cardViewBtn.classList.contains('active')) {
            cardView.classList.remove('hidden');
            tableView.classList.add('hidden');
        }

        // Se estava no modo de edição, sair
        if (isEditMode) {
            isEditMode = false;
            editModeToggle.classList.remove('active');
            editModeControls.classList.add('hidden');
            renderTable(searchInput.value);
        }
    });

    clientModeBtn.addEventListener('click', function() {
        isClientMode = true;
        clientModeBtn.classList.add('active');
        internalModeBtn.classList.remove('active');

        // Esconder controles de visualização interna
        viewToggle.classList.add('hidden');

        // Esconder modo de edição se estiver ativo
        if (isEditMode) {
            isEditMode = false;
            editModeToggle.classList.remove('active');
            editModeControls.classList.add('hidden');
        }

        // Esconder todas as outras visualizações
        tableView.classList.add('hidden');
        cardView.classList.add('hidden');
        customClientView.classList.add('hidden');

        // Mostrar visualização do cliente
        clientView.classList.remove('hidden');

        // Renderizar cards para cliente
        renderClientCards(searchInput.value);
    });

    // Modo de edição
    editModeToggle.addEventListener('click', function() {
        isEditMode = !isEditMode;

        if (isEditMode) {
            // Entrar no modo de edição
            editModeToggle.classList.add('active');
            editModeControls.classList.remove('hidden');

            // Fazer cópia dos produtos para poder cancelar
            editedProducts = JSON.parse(JSON.stringify(produtos));

            // Forçar visualização de tabela
            tableViewBtn.classList.add('active');
            cardViewBtn.classList.remove('active');
            tableView.classList.remove('hidden');
            cardView.classList.add('hidden');

            // Re-renderizar com inputs
            renderTable(searchInput.value);

            showToast('Modo de edição ativado');
        } else {
            // Sair do modo de edição
            editModeToggle.classList.remove('active');
            editModeControls.classList.add('hidden');

            renderTable(searchInput.value);

            showToast('Modo de edição desativado');
        }
    });

    // Salvar alterações
    saveChangesBtn.addEventListener('click', function() {
        // Coletar todas as mudanças dos inputs
        const inputs = document.querySelectorAll('#tableBody input');

        inputs.forEach(input => {
            const index = parseInt(input.dataset.index);
            const field = input.dataset.field;
            const value = input.value.trim() || '-';

            if (produtos[index]) {
                produtos[index][field] = value;
            }
        });

        // Salvar no localStorage
        saveProducts();

        // Sair do modo de edição
        isEditMode = false;
        editModeToggle.classList.remove('active');
        editModeControls.classList.add('hidden');

        // Re-renderizar
        renderTable(searchInput.value);

        showToast('✅ Alterações salvas com sucesso!');
    });

    // Cancelar edição
    cancelEditBtn.addEventListener('click', function() {
        // Restaurar produtos originais
        if (editedProducts) {
            produtos.length = 0;
            produtos.push(...editedProducts);
            editedProducts = null;
        }

        // Sair do modo de edição
        isEditMode = false;
        editModeToggle.classList.remove('active');
        editModeControls.classList.add('hidden');

        // Re-renderizar
        renderTable(searchInput.value);

        showToast('Edição cancelada');
    });

    // Selecionar/desselecionar todos
    selectAllCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // Selecionar todos os produtos filtrados
            filteredProducts.forEach(produto => {
                const index = produtos.indexOf(produto);
                selectedProducts.add(index);
            });
        } else {
            // Desselecionar todos
            selectedProducts.clear();
        }
        updateSelectionControls();
        renderTable(searchInput.value);
    });

    // Preparar para cliente
    prepareForClientBtn.addEventListener('click', function() {
        if (selectedProducts.size === 0) {
            showToast('⚠️ Selecione pelo menos um produto');
            return;
        }
        openConfigModal();
    });

    // Limpar seleção
    clearSelectionBtn.addEventListener('click', function() {
        selectedProducts.clear();
        productTableConfig = {};
        updateSelectionControls();
        renderTable(searchInput.value);
        showToast('Seleção limpa');
    });

    // Fechar modal
    closeModal.addEventListener('click', function() {
        configModal.classList.remove('active');
    });

    cancelConfigBtn.addEventListener('click', function() {
        configModal.classList.remove('active');
    });

    // Confirmar configuração e gerar visualização
    confirmConfigBtn.addEventListener('click', function() {
        generateCustomClientView();
    });

    // Fechar modal clicando fora
    configModal.addEventListener('click', function(e) {
        if (e.target === configModal) {
            configModal.classList.remove('active');
        }
    });

    // Atualizar botão de modo interno para limpar visualização customizada
    const originalInternalClick = internalModeBtn.onclick;
    internalModeBtn.addEventListener('click', function() {
        customClientView.classList.add('hidden');
    });

    // Event listeners para adicionar produto
    addProductBtn.addEventListener('click', function() {
        openAddProductModal();
    });

    closeAddProductModalBtn.addEventListener('click', function() {
        closeAddProductModal();
    });

    cancelAddProductBtn.addEventListener('click', function() {
        closeAddProductModal();
    });

    confirmAddProductBtn.addEventListener('click', function() {
        addNewProduct();
    });

    // Fechar modal de adicionar produto clicando fora
    addProductModal.addEventListener('click', function(e) {
        if (e.target === addProductModal) {
            closeAddProductModal();
        }
    });

    // Permitir adicionar produto com Enter
    document.getElementById('addProductModal').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewProduct();
        }
    });

    // Foco no campo de pesquisa ao carregar
    searchInput.focus();
});
