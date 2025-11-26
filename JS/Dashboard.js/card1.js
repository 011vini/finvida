// ============================
//  CARD 1 — SALDO
// ============================

const saldoAtualEl = document.getElementById("saldoAtual");
const saldoAnteriorEl = document.getElementById("saldoAnterior");

function atualizarCard1() {
    saldoAtualEl.textContent = financeiro.formatarReal(financeiro.getSaldo());
    saldoAnteriorEl.textContent = financeiro.formatarReal(financeiro.getSaldoAnterior());
}

// Atualiza ao carregar
atualizarCard1();

// Expõe globalmente
window.atualizarCard1 = atualizarCard1;