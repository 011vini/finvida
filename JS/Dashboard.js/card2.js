// Sempre carregar a lista atualizada
function getListaGastos() {
    return JSON.parse(localStorage.getItem("listaDeGastos")) || [];
}

function salvarListaGastos(lista) {
    localStorage.setItem("listaDeGastos", JSON.stringify(lista));
}

// Botão de salvar
const btnSalvar = document.getElementById("btnSalvarGasto");

btnSalvar.addEventListener("click", function () {
    const descricao = document.getElementById("descricao").value;
    const valor = Number(document.getElementById("valor").value);
    const categoria = document.getElementById("categoria").value;
    const data = document.getElementById("data").value;

    if (!descricao || !valor || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    // Recarregar lista REAL atualizada
    const listaDeGastos = getListaGastos();

    // Criar gasto
    const novoGasto = { descricao, valor, categoria, data };

    // Salvar
    listaDeGastos.push(novoGasto);
    salvarListaGastos(listaDeGastos);

    // Atualizar saldo
    const saldoNovo = financeiro.getSaldo() - valor;
    financeiro.setSaldo(saldoNovo);

    document.getElementById("saldoAtual").textContent = financeiro.formatarReal(saldoNovo);

    // Limpar formulário
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("categoria").value = "Outros";
    document.getElementById("data").value = "";

    alert("Gasto registrado com sucesso!");

    carregarHistorico();
    gerarGrafico();
});
