// ============================
//  CARD 3 — HISTÓRICO DE GASTOS
// ============================

// Elemento onde os gastos serão exibidos
const listaDiv = document.getElementById("listaGastos");

// --- PEGAR ELEMENTOS DOS FILTROS ---
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroDataInicio = document.getElementById("filtroDataInicio");
const filtroDataFim = document.getElementById("filtroDataFim");
const filtroOrdenar = document.getElementById("filtroOrdenar");


// --- FUNÇÃO PRINCIPAL: CARREGAR HISTÓRICO  ---
async function carregarHistorico() {
    let lista = await financeiro.buscarGastosAPI() || [];

    // APLICAR FILTROS
    lista = aplicarFiltros(lista);

    listaDiv.innerHTML = "";

    if (lista.length === 0) {
        listaDiv.innerHTML = "<p class='vazio'>Nenhum gasto encontrado.</p>";
        return;
    }

    lista.forEach((gasto, index) => {
        const item = document.createElement("div");
        item.classList.add("item-gasto");

        item.innerHTML = `
        <div class="item-conteudo">
            <strong class="descricao">${gasto.descricao}</strong>

            <div class="linha-info">
                <span><b>Categoria:</b> ${gasto.categoria}</span>
                <span><b>Valor:</b> ${gasto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}</span>
                <span><b>Data:</b> ${gasto.data_gasto}</span>
            </div>
        </div>

        <button class="btn-excluir" data-id="${gasto.id}" data-valor="${gasto.valor}">×</button>
    `;

        listaDiv.appendChild(item);
    });
}


// --- FUNÇÃO QUE APLICA TODOS OS FILTROS ---
function aplicarFiltros(lista) {

    // FILTRO POR CATEGORIA
    if (filtroCategoria.value !== "todas") {
        lista = lista.filter(item => item.categoria === filtroCategoria.value);
    }

    // FILTRO POR DATA INICIAL
    if (filtroDataInicio.value) {
        lista = lista.filter(item => item.data_gasto >= filtroDataInicio.value);
    }

    // FILTRO POR DATA FINAL
    if (filtroDataFim.value) {
        lista = lista.filter(item => item.data_gasto <= filtroDataFim.value);
    }

    // ORDENAR
    if (filtroOrdenar.value === "valorAsc") {
        lista.sort((a, b) => a.valor - b.valor);

    } else if (filtroOrdenar.value === "valorDesc") {
        lista.sort((a, b) => b.valor - a.valor);

    } else if (filtroOrdenar.value === "dataAsc") {
        lista.sort((a, b) => new Date(a.data_gasto) - new Date(b.data_gasto));

    } else if (filtroOrdenar.value === "dataDesc") {
        lista.sort((a, b) => new Date(b.data_gasto) - new Date(a.data_gasto));
    }

    return lista;
}

// --- EVENTO DE EXCLUSÃO DE GASTO ---
document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("btn-excluir")) {

        const id = e.target.getAttribute("data-id");
        const valorRemovido = Number(e.target.getAttribute("data-valor"));

        if(confirm("Deseja realmente excluir este gasto?")) {
            const res = await financeiro.deletarGastoAPI(id);
            if(res && res.status === 'sucesso') {
                // devolve o valor ao saldo
                financeiro.setSaldo(financeiro.getSaldo() + valorRemovido);

                // atualiza tela
                atualizarCard1();
                await carregarHistorico();
                await gerarGrafico();
            } else {
                alert("Erro ao excluir gasto.");
            }
        }
    }
});


// --- QUANDO QUALQUER FILTRO MUDA, RECARREGA ---
[filtroCategoria, filtroDataInicio, filtroDataFim, filtroOrdenar].forEach(f => {
    f.addEventListener("change", carregarHistorico);
});



// --- CHAMAR AO CARREGAR A PÁGINA ---
carregarHistorico();