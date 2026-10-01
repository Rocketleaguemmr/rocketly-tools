/**
 * Rocketly Tools - Core JavaScript Engine v2.1
 * Rangos y umbrales de MMR oficiales calibrados según competición.
 */

const RANKS_DATABASE = [
    { name: "Bronze I", min: 0, max: 75, color: "#cd7f32" },
    { name: "Bronze II", min: 75, max: 150, color: "#cd7f32" },
    { name: "Bronze III", min: 150, max: 225, color: "#cd7f32" },
    { name: "Silver I", min: 225, max: 300, color: "#c0c0c0" },
    { name: "Silver II", min: 300, max: 375, color: "#c0c0c0" },
    { name: "Silver III", min: 375, max: 450, color: "#c0c0c0" },
    { name: "Gold I", min: 450, max: 525, color: "#ffd700" },
    { name: "Gold II", min: 525, max: 600, color: "#ffd700" },
    { name: "Gold III", min: 600, max: 675, color: "#ffd700" },
    { name: "Platinum I", min: 675, max: 750, color: "#00e5ff" },
    { name: "Platinum II", min: 750, max: 825, color: "#00e5ff" },
    { name: "Platinum III", min: 825, max: 900, color: "#00e5ff" },
    { name: "Diamond I", min: 900, max: 975, color: "#2979ff" },
    { name: "Diamond II", min: 975, max: 1050, color: "#2979ff" },
    { name: "Diamond III", min: 1050, max: 1075, color: "#2979ff" },
    { name: "Champion I", min: 1075, max: 1180, color: "#d500f9" },
    { name: "Champion II", min: 1180, max: 1300, color: "#d500f9" },
    { name: "Champion III", min: 1300, max: 1425, color: "#d500f9" },
    { name: "Grand Champion I", min: 1425, max: 1560, color: "#ff1744" },
    { name: "Grand Champion II", min: 1560, max: 1700, color: "#ff1744" },
    { name: "Grand Champion III", min: 1700, max: 1860, color: "#ff1744" },
    { name: "Supersonic Legend", min: 1860, max: 5000, color: "#ffffff" }
];

/**
 * Obtiene el rango exacto según el MMR.
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
 * Renderiza la lista de rangos en la web.
 */
function renderRanksGrid() {
    const gridContainer = document.getElementById("rankList");
    if (!gridContainer) return;

    gridContainer.innerHTML = RANKS_DATABASE.map(rank => `
        <div class="rank-item" style="border-left: 4px solid ${rank.color}">
            <span class="name" style="color: ${rank.color}">${rank.name}</span>
            <span class="mmr">${rank.min} - ${rank.max === 5000 ? '1860+' : rank.max} MMR</span>
        </div>
    `).join("");
}

/**
 * Cálculo predictivo del MMR.
 */
function executeMMRCalculation() {
    const winrateInput = Number(document.getElementById("winrate").value);
    const targetInput = Number(document.getElementById("target").value);

    const safeWinrate = isNaN(winrateInput) ? 50 : Math.max(0, Math.min(100, winrateInput));
    const safeTarget = isNaN(targetInput) ? 1150 : Math.max(0, Math.min(3000, targetInput));

    // Estimación calibrada a los nuevos umbrales (ej: 55% winrate ronda los 1100-1145 MMR)
    let evaluatedMmr = Math.round(900 + (safeWinrate - 50) * 12);
    if (evaluatedMmr < 0) evaluatedMmr = 0;

    const assignedRank = resolveRank(evaluatedMmr);

    document.getElementById("resultMmr").textContent = `${evaluatedMmr} MMR`;
    document.getElementById("resultRank").textContent = assignedRank.name;

    const difference = safeTarget - evaluatedMmr;
    const targetMessageElement = document.getElementById("targetResult");

    if (difference <= 0) {
        targetMessageElement.innerHTML = `🎉 ¡Excelente! Con un rendimiento del <b>${safeWinrate}%</b>, ya alcanzas o superas los ${safeTarget} MMR.`;
    } else {
        const estimatedGames = Math.ceil(difference / 9);
        targetMessageElement.innerHTML = `💡 Necesitas aproximadamente <b>${estimatedGames} victorias netas</b> para escalar desde tus ${evaluatedMmr} MMR hasta el objetivo de ${safeTarget} MMR.`;
    }
}

/**
 * Simulación de racha competitiva.
 */
function executeStreakSimulation() {
    const currentMmrInput = Number(document.getElementById("currentStreakMMR").value);
    const winsInput = Number(document.getElementById("winsStreak").value);

    const safeCurrentMmr = isNaN(currentMmrInput) ? 1145 : Math.max(0, Math.min(3000, currentMmrInput));
    const safeWins = isNaN(winsInput) ? 3 : Math.max(0, Math.min(100, winsInput));

    const projectedGain = Math.round(safeWins * 9);
    const finalProjectedMmr = safeCurrentMmr + projectedGain;
    const finalProjectedRank = resolveRank(finalProjectedMmr);

    const streakResultElement = document.getElementById("streakResult");
    streakResultElement.innerHTML = `🚀 Tras encadenar <b>${safeWins} victorias consecutivas</b> desde tus ${safeCurrentMmr} MMR, tu MMR estimado será de <b>${finalProjectedMmr} MMR</b> (${finalProjectedRank.name}).`;
}

// Inicialización de eventos
document.addEventListener("DOMContentLoaded", () => {
    renderRanksGrid();
    
    const btnMMR = document.getElementById("btnCalculateMMR");
    const btnStreak = document.getElementById("btnCalculateStreak");

    if (btnMMR) btnMMR.addEventListener("click", executeMMRCalculation);
    if (btnStreak) btnStreak.addEventListener("click", executeStreakSimulation);

    executeMMRCalculation();
    executeStreakSimulation();
});
