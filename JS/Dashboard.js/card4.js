// ============================
//  CARD 4 — GRÁFICO DE GASTOS
// ============================

let graficoGastos = null;

// Variável para armazenar a instância do gráfico
async function calcularGastosPorCategoria() {
    const categorias = {};

    const lista = await financeiro.buscarGastosAPI() || [];

    lista.forEach(gasto => {
        if (!categorias[gasto.categoria]) {
            categorias[gasto.categoria] = 0;
        }
        categorias[gasto.categoria] += Number(gasto.valor);
    });

    return categorias;
}

// Função para gerar o gráfico
async function gerarGrafico() {
    const ctx = document.getElementById("graficoGastos");

    const dados = await calcularGastosPorCategoria();
    // Extrair labels e valores
    const labels = Object.keys(dados);
    const valores = Object.values(dados);

    // Se já existe um gráfico, destrói antes de criar outro
    if (graficoGastos !== null) {
        graficoGastos.destroy();
    }
    // Criar novo gráfico de pizza
    graficoGastos = new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: [
                    "#66bb6a",
                    "#ef5350",
                    "#42a5f5",
                    "#ffa726",
                    "#8d6e63",
                    "#ab47bc",
                    "#26a69a",
                    "#ec407a",
                    "#cddc39"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });
}

gerarGrafico();