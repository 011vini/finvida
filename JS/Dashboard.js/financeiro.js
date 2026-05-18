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

    // --- API DE GASTOS ---
    async function getUsuarioId() {
        const userStr = localStorage.getItem("userLogado");
        if (!userStr) return null;
        return JSON.parse(userStr).id;
    }

    async function buscarGastosAPI() {
        const uid = await getUsuarioId();
        if (!uid) return [];
        try {
            const res = await fetch(`./backend/gastos/listar.php?usuario_id=${uid}`);
            return await res.json();
        } catch (e) {
            console.error("Erro ao buscar gastos:", e);
            return [];
        }
    }

    async function adicionarGastoAPI(gasto) {
        const uid = await getUsuarioId();
        if (!uid) return null;
        try {
            gasto.usuario_id = uid;
            const res = await fetch('./backend/gastos/adicionar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gasto)
            });
            return await res.json();
        } catch (e) {
            console.error("Erro ao adicionar gasto:", e);
            return null;
        }
    }

    async function deletarGastoAPI(id) {
        const uid = await getUsuarioId();
        if (!uid) return null;
        try {
            const res = await fetch('./backend/gastos/deletar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, usuario_id: uid })
            });
            return await res.json();
        } catch (e) {
            console.error("Erro ao deletar gasto:", e);
            return null;
        }
    }

    async function deletarTodosGastosAPI() {
        const uid = await getUsuarioId();
        if (!uid) return null;
        try {
            const res = await fetch('./backend/gastos/deletar_todos.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario_id: uid })
            });
            return await res.json();
        } catch (e) {
            console.error("Erro ao deletar todos os gastos:", e);
            return null;
        }
    }

    // Tornar módulo global
    window.financeiro = {
        formatarReal,
        getSaldo,
        setSaldo,
        getSaldoAnterior,
        setSaldoAnterior,
        adicionarDinheiro,
        fecharMes,
        buscarGastosAPI,
        adicionarGastoAPI,
        deletarGastoAPI,
        deletarTodosGastosAPI
    };

})();
