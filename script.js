/**
 * Rocketly Tools - Core JavaScript Engine v2.2
 * Base de rangos oficiales sincronizada exactamente con los umbrales indicados.
 */

const RANKS_DATABASE = [
    { name: "Bronze I", min: 0, max: 75, color: "#cd7f32", icon: "🥉" },
    { name: "Bronze II", min: 75, max: 150, color: "#cd7f32", icon: "🥉" },
    { name: "Bronze III", min: 150, max: 225, color: "#cd7f32", icon: "🥉" },
    { name: "Silver I", min: 225, max: 300, color: "#c0c0c0", icon: "🥈" },
    { name: "Silver II", min: 300, max: 375, color: "#c0c0c0", icon: "🥈" },
    { name: "Silver III", min: 375, max: 450, color: "#c0c0c0", icon: "🥈" },
    { name: "Gold I", min: 450, max: 525, color: "#ffd700", icon: "🥇" },
    { name: "Gold II", min: 525, max: 600, color: "#ffd700", icon: "🥇" },
    { name: "Gold III", min: 600, max: 675, color: "#ffd700", icon: "🥇" },
    { name: "Platinum I", min: 675, max: 750, color: "#00e5ff", icon: "💎" },
    { name: "Platinum II", min: 750, max: 825, color: "#00e5ff", icon: "💎" },
    { name: "Platinum III", min: 825, max: 900, color: "#00e5ff", icon: "💎" },
    { name: "Diamond I", min: 900, max: 975, color: "#2979ff", icon: "💠" },
    { name: "Diamond II", min: 975, max: 1050, color: "#2979ff", icon: "💠" },
    { name: "Diamond III", min: 1050, max: 1075, color: "#2979ff", icon: "💠" },
    { name: "Champion I", min: 1075, max: 1180, color: "#d500f9", icon: "🟣" },
    { name: "Champion II", min: 1180, max: 1300, color: "#d500f9", icon: "🟣" },
    { name: "Champion III", min: 1300, max: 1425, color: "#d500f9", icon: "🟣" },
    { name: "Grand Champion I", min: 1425, max: 1560, color: "#ff1744", icon: "🔴" },
    { name: "Grand Champion II", min: 1560, max: 1700, color: "#ff1744", icon: "🔴" },
    { name: "Grand Champion III", min: 1700, max: 1860, color: "#ff1744", icon: "🔴" },
    { name: "Supersonic Legend", min: 1860, max: 9999, color: "#ffffff", icon: "🏆" }
];

/**
 * Obtiene el rango exacto según el MMR introducido.
 */
function resolveRank(mmrValue) {
    for (const rank of RANKS_DATABASE) {
        if (mmrValue >= rank.min && mmrValue < rank.max) {
            return rank;
        }
    }
    return RANKS_DATABASE[RANKS_DATABASE.length - 1];
}

/**
 * Renderiza la lista de rangos abajo en la web de manera idéntica a tu estructura.
 */
function renderRanksGrid() {
    const gridContainer = document.getElementById("rankList");
    if (!gridContainer) return;

    gridContainer.innerHTML = RANKS_DATABASE.map(rank => {
        const mmrText = rank.min === 1860 ? "1860+" : `${rank.min}–${rank.max}`;
        return `
            <div class="rank-item" style="border-left: 4px solid ${rank.color}">
                <span class="name" style="color: ${rank.color}">${rank.icon} ${rank.name}</span>
                <span class="mmr">${mmrText} MMR</span>
            </div>
        `;
    }).join("");
}

/**
 * Cálculo predictivo del MMR.
 */
function executeMMRCalculation() {
    const winrateInput = Number(document.getElementById("winrate").value);
    const targetInput = Number(document.getElementById("target").value);

    const safeWinrate = isNaN(winrateInput) ? 50 : Math.max(0, Math.min(100, winrateInput));
    const safeTarget = isNaN(targetInput) ? 1150 : Math.max(0, Math.min(3000, targetInput));

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

// Inicialización de eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderRanksGrid();
    
    const btnMMR = document.getElementById("btnCalculateMMR");
    const btnStreak = document.getElementById("btnCalculateStreak");

    if (btnMMR) btnMMR.addEventListener("click", executeMMRCalculation);
    if (btnStreak) btnStreak.addEventListener("click", executeStreakSimulation);

    executeMMRCalculation();
    executeStreakSimulation();
});
