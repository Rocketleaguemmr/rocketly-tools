// Rangos oficiales de Rocket League con umbrales de MMR correctos
const RANKS = [
    { name: "Bronze", min: 0, max: 350, color: "#cd7f32" },
    { name: "Silver", min: 351, max: 580, color: "#c0c0c0" },
    { name: "Gold", min: 581, max: 800, color: "#ffd700" },
    { name: "Platinum", min: 801, max: 1025, color: "#00e5ff" },
    { name: "Diamond", min: 1026, max: 1250, color: "#2979ff" },
    { name: "Champion", min: 1251, max: 1475, color: "#d500f9" },
    { name: "Grand Champion", min: 1476, max: 1850, color: "#ff1744" },
    { name: "Supersonic Legend", min: 1851, max: 5000, color: "#ffffff" }
];

function getRankByMmr(mmr) {
    for (let rank of RANKS) {
        if (mmr >= rank.min && mmr <= rank.max) {
            return rank;
        }
    }
    return RANKS[RANKS.length - 1];
}

function renderRankList() {
    const container = document.getElementById("rankList");
    if (!container) return;
    container.innerHTML = RANKS.map(r => `
        <div class="rank-item" style="border-left: 4px solid ${r.color}">
            <span class="name" style="color: ${r.color}">${r.name}</span>
            <span class="mmr">${r.min} - ${r.max === 5000 ? '∞' : r.max} MMR</span>
        </div>
    `).join("");
}

function calculateMMR() {
    const winrate = Number(document.getElementById("winrate").value) || 50;
    const target = Number(document.getElementById("target").value) || 1150;
    
    // Estimación base según winrate orientativo
    let baseMmr = Math.round(800 + (winrate - 50) * 15);
    if (baseMmr < 0) baseMmr = 0;

    const currentRank = getRankByMmr(baseMmr);

    document.getElementById("resultMmr").textContent = `${baseMmr} MMR`;
    document.getElementById("resultRank").textContent = `${currentRank.name}`;

    const diff = target - baseMmr;
    const targetResultEl = document.getElementById("targetResult");

    if (diff <= 0) {
        targetResultEl.textContent = `¡Ya estás en tu objetivo o por encima de él!`;
    } else {
        const gamesNeeded = Math.ceil(diff / 9);
        targetResultEl.textContent = `Necesitas aproximadamente ${gamesNeeded} victorias netas para alcanzar ${target} MMR.`;
    }
}

function calculateStreak() {
    const currentMMR = Number(document.getElementById("currentStreakMMR").value) || 1145;
    const wins = Number(document.getElementById("winsStreak").value) || 0;
    
    const estimatedGain = Math.round(wins * 9.5);
    const newMMR = currentMMR + estimatedGain;
    const newRank = getRankByMmr(newMMR);

    document.getElementById("streakResult").textContent = 
        `Con ${wins} victorias consecutivas, pasarás de ${currentMMR} a un estimado de ${newMMR} MMR (${newRank.name}).`;
}

// Event Listeners
document.getElementById("winrate").addEventListener("input", calculateMMR);
document.getElementById("target").addEventListener("input", calculateMMR);
document.getElementById("currentStreakMMR").addEventListener("input", calculateStreak);
document.getElementById("winsStreak").addEventListener("input", calculateStreak);

// Inicializar al cargar
renderRankList();
calculateMMR();
calculateStreak();
