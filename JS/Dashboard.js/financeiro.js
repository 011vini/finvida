// ============================
//  MÓDULO CENTRAL FINANCEIRO
// ============================

(function () {
    // Valores padrão
    const SALDO_PADRAO = 100;
    const SALDO_ANTERIOR_PADRAO = 100;

    // --- FORMATAÇÃO DE MOEDA PARA REAL---
    function formatarReal(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // --- carregar saldo atual ---
    function getSaldo() {
        const s = localStorage.getItem("saldoAtual");
        return s !== null ? Number(s) : SALDO_PADRAO;
    }

    // --- salvar saldo atual ---
    function setSaldo(valor) {
        localStorage.setItem("saldoAtual", Number(valor));
    }

    // --- carregar saldo anterior ---
    function getSaldoAnterior() {
        const s = localStorage.getItem("saldoAnterior");
        return s !== null ? Number(s) : SALDO_ANTERIOR_PADRAO;
    }

    // --- salvar saldo anterior ---
    function setSaldoAnterior(valor) {
        localStorage.setItem("saldoAnterior", Number(valor));
    }

    // --- adicionar dinheiro ---
    function adicionarDinheiro(valor) {
        const novo = getSaldo() + Number(valor);
        setSaldo(novo);
        return novo;
    }

    // --- fechar mês ---
    function fecharMes() {
        const atual = getSaldo();
        setSaldoAnterior(atual);
        return atual;
    }

    // Tornar módulo global
    window.financeiro = {
        formatarReal,
        getSaldo,
        setSaldo,
        getSaldoAnterior,
        setSaldoAnterior,
        adicionarDinheiro,
        fecharMes
    };

})();
