/**
 * Rocketly Tools - Core JavaScript Engine v2.0
 * Motor robusto de procesamiento de MMR y simulación de rachas competitivas.
 */

const RANKS_DATABASE = [
    { name: "Bronze", min: 0, max: 350, color: "#cd7f32" },
    { name: "Silver", min: 351, max: 580, color: "#c0c0c0" },
    { name: "Gold", min: 581, max: 800, color: "#ffd700" },
    { name: "Platinum", min: 801, max: 1025, color: "#00e5ff" },
    { name: "Diamond", min: 1026, max: 1250, color: "#2979ff" },
    { name: "Champion", min: 1251, max: 1475, color: "#d500f9" },
    { name: "Grand Champion", min: 1476, max: 1850, color: "#ff1744" },
    { name: "Supersonic Legend", min: 1851, max: 5000, color: "#ffffff" }
];

/**
 * Obtiene el objeto de rango correspondiente a un valor de MMR dado.
 */
function resolveRank(mmrValue) {
    for (const rank of RANKS_DATABASE) {
        if (mmrValue >= rank.min && mmrValue <= rank.max) {
            return rank;
        }
    }
    return RANKS_DATABASE[RANKS_DATABASE.length - 1];
}

/**
 * Renderiza dinámicamente la tabla oficial de rangos en el DOM.
 */
function renderRanksGrid() {
    const gridContainer = document.getElementById("rankList");
    if (!gridContainer) return;

    gridContainer.innerHTML = RANKS_DATABASE.map(rank => `
        <div class="rank-item" style="border-left: 4px solid ${rank.color}">
            <span class="name" style="color: ${rank.color}">${rank.name}</span>
            <span class="mmr">${rank.min} - ${rank.max === 5000 ? 'Infinito' : rank.max} MMR</span>
        </div>
    `).join("");
}

/**
 * Ejecuta el cálculo predictivo del MMR general de la primera tarjeta.
 */
function executeMMRCalculation() {
    const winrateInput = Number(document.getElementById("winrate").value);
    const targetInput = Number(document.getElementById("target").value);

    // Validaciones de seguridad de datos
    const safeWinrate = isNaN(winrateInput) ? 50 : Math.max(0, Math.min(100, winrateInput));
    const safeTarget = isNaN(targetInput) ? 1250 : Math.max(0, Math.min(3000, targetInput));

    // Motor de cálculo basado en estimación ponderada
    let evaluatedMmr = Math.round(850 + (safeWinrate - 50) * 16.5);
    if (evaluatedMmr < 0) evaluatedMmr = 0;

    const assignedRank = resolveRank(evaluatedMmr);

    // Volcado de resultados al DOM
    document.getElementById("resultMmr").textContent = `${evaluatedMmr} MMR`;
    document.getElementById("resultRank").textContent = assignedRank.name;

    const difference = safeTarget - evaluatedMmr;
    const targetMessageElement = document.getElementById("targetResult");

    if (difference <= 0) {
        targetMessageElement.innerHTML = `🎉 ¡Excelente! Con tu rendimiento actual de <b>${safeWinrate}%</b> de victorias, ya superas o igualas tu objetivo de ${safeTarget} MMR.`;
    } else {
        const estimatedGames = Math.ceil(difference / 9.5);
        targetMessageElement.innerHTML = `💡 Necesitarás aproximadamente <b>${estimatedGames} victorias netas</b> consecutivas o estables para escalar desde tus ${evaluatedMmr} MMR actuales hasta los ${safeTarget} MMR deseados.`;
    }
}

/**
 * Ejecuta la simulación matemática de la racha de victorias de la segunda tarjeta.
 */
function executeStreakSimulation() {
    const currentMmrInput = Number(document.getElementById("currentStreakMMR").value);
    const winsInput = Number(document.getElementById("winsStreak").value);

    const safeCurrentMmr = isNaN(currentMmrInput) ? 1145 : Math.max(0, Math.min(3000, currentMmrInput));
    const safeWins = isNaN(winsInput) ? 5 : Math.max(0, Math.min(100, winsInput));

    // Factor de ganancia promedio por racha ganadora en competitivo (~9.2 MMR por victoria neta)
    const projectedGain = Math.round(safeWins * 9.2);
    const finalProjectedMmr = safeCurrentMmr + projectedGain;
    const finalProjectedRank = resolveRank(finalProjectedMmr);

    const streakResultElement = document.getElementById("streakResult");
    streakResultElement.innerHTML = `🚀 Tras encadenar <b>${safeWins} victorias consecutivas</b> desde tus ${safeCurrentMmr} MMR, tu MMR estimado ascenderá hasta <b>${finalProjectedMmr} MMR</b>, posicionándote directamente en el rango <b>${finalProjectedRank.name}</b>.`;
}

// Inicialización de eventos de escucha en los botones
document.addEventListener("DOMContentLoaded", () => {
    renderRanksGrid();
    
    const btnMMR = document.getElementById("btnCalculateMMR");
    const btnStreak = document.getElementById("btnCalculateStreak");

    if (btnMMR) btnMMR.addEventListener("click", executeMMRCalculation);
    if (btnStreak) btnStreak.addEventListener("click", executeStreakSimulation);

    // Ejecución inicial automática para que no aparezca vacío de inicio
    executeMMRCalculation();
    executeStreakSimulation();
});
