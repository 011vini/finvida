// Proteção
if (!localStorage.getItem("token")) {
    // Redireciona o usuário de forma fluida para a tela de login
    window.location.href = './HTML/signin.html';
}

// Nome do usuário
const user = JSON.parse(localStorage.getItem("userLogado"));
document.getElementById("perfilNome").innerText = "Olá, " + user.nome;

// Modal
const modalPerfil = document.getElementById("modalPerfil");
const btnPerfil = document.querySelector("#btnPerfil");
const fecharPerfil = document.getElementById("fecharPerfil");

btnPerfil.addEventListener("click", () => modalPerfil.style.display = "block");
fecharPerfil.addEventListener("click", () => modalPerfil.style.display = "none");

// =====================
// ADICIONAR DINHEIRO
// =====================
document.getElementById("btnAdicionar").addEventListener("click", () => {
    const valor = Number(document.getElementById("valorAdicionar").value);

    if (valor <= 0 || isNaN(valor)) return alert("Valor inválido!");

    financeiro.adicionarDinheiro(valor);

    atualizarCard1();

    alert("Valor adicionado!");
    document.getElementById("valorAdicionar").value = "";
});

// =====================
// FECHAR MÊS
// =====================
document.getElementById("btnFecharMes").addEventListener("click", () => {
    financeiro.fecharMes();
    atualizarCard1();
    alert("Mês fechado!");
});

// =====================
// SAIR
// =====================
document.getElementById("btnSair").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = '../HTML/signin.html';
});

// =====================
// resetar sistema financeiro
// =====================

document.getElementById("btnResetar").addEventListener("click", async () => {
    if (!confirm("Tem certeza que deseja resetar tudo?\nIsto apagará todos os gastos e retornará os valores padrão.")) {
        return;
    }

    const saldoPadrao = 100;
    const saldoAnteriorPadrao = 100;

    // Resetar dados
    localStorage.setItem("saldoAtual", saldoPadrao);
    localStorage.setItem("saldoAnterior", saldoAnteriorPadrao);
    
    // Apagar todos os gastos do MySQL
    const res = await financeiro.deletarTodosGastosAPI();
    
    if(res && res.status === 'sucesso') {
        // Atualizar saldo na tela
        atualizarCard1();

        // Atualizar saldo último mês no perfil
        const saldoUltimoMesEl = document.getElementById("saldoUltimoMes");
        if (saldoUltimoMesEl) saldoUltimoMesEl.textContent = financeiro.formatarReal(saldoAnteriorPadrao);

        // Atualizar histórico e gráfico
        if (typeof carregarHistorico === "function") await carregarHistorico();
        if (typeof gerarGrafico === "function") await gerarGrafico();
        alert("Sistema financeiro resetado!");
    } else {
        alert("Erro ao resetar os gastos no banco de dados.");
    }
});
