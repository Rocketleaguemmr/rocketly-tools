const $ = id => document.getElementById(id);

const ranks = [
  {name:"Bronze", min:0, max:399, color:"#a66b48"},
  {name:"Silver", min:400, max:599, color:"#aeb8c8"},
  {name:"Gold", min:600, max:799, color:"#e6b84e"},
  {name:"Platinum", min:800, max:999, color:"#55d7c0"},
  {name:"Diamond", min:1000, max:1199, color:"#5ba9ff"},
  {name:"Champion", min:1200, max:1399, color:"#c45cff"},
  {name:"Grand Champion", min:1400, max:1799, color:"#ff596f"},
  {name:"Supersonic Legend", min:1800, max:5000, color:"#f5f5f5"}
];

function getRank(mmr){
  return ranks.find(r => mmr >= r.min && mmr <= r.max) || ranks[ranks.length-1];
}

function renderRankList(){
  $("rankList").innerHTML = ranks.map(r => `
    <div class="rank-item">
      <span class="dot" style="--rank-color:${r.color}"></span><strong>${r.name}</strong>
      <small>${r.min}–${r.max === 5000 ? "∞" : r.max} MMR</small>
    </div>
  `).join("");
}

function calculate(){
  let mmr = Math.max(0, Number($("mmr").value) || 0);
  let change = Math.max(1, Number($("change").value) || 1);
  let games = Math.max(0, Number($("games").value) || 0);
  let winrate = Number($("winrate").value);
  let wins = Math.round(games * winrate / 100);
  let losses = games - wins;
  let net = wins - losses;
  let result = Math.max(0, Math.round(mmr + net * change));
  let rank = getRank(result);

  $("resultMmr").textContent = result;
  $("rankBadge").textContent = rank.name.toUpperCase();
  $("rankBadge").style.color = rank.color;
  $("rankBadge").style.borderColor = rank.color + "55";
  $("rankBadge").style.background = rank.color + "14";

  $("gained").textContent = `${result - mmr >= 0 ? "+" : ""}${result - mmr}`;
  $("wins").textContent = wins;
  $("losses").textContent = losses;
  $("resultWinrate").textContent = `${winrate}%`;
  $("winrateValue").textContent = `${winrate}%`;

  let range = rank.max === 5000 ? 500 : rank.max - rank.min;
  let progress = rank.max === 5000
    ? Math.min(100, ((result - rank.min) / range) * 100)
    : Math.max(0, Math.min(100, ((result - rank.min) / (rank.max - rank.min + 1)) * 100));

  $("progressBar").style.width = `${progress}%`;
  $("progressText").textContent = rank.max === 5000
    ? `${Math.max(0, result-rank.min)} MMR dentro de ${rank.name}`
    : `${Math.max(0, result-rank.min)} / ${rank.max-rank.min+1} MMR`;

  updateTarget(result, change);
}

function updateTarget(current, change){
  let target = Math.max(0, Number($("target").value) || 0);
  let diff = target - current;
  if(diff <= 0){
    $("targetResult").textContent = `Ya estás en ${target} MMR o por encima de ese objetivo.`;
    return;
  }
  let games = Math.ceil(diff / change);
  $("targetResult").textContent =
    `Necesitas aproximadamente ${games} victorias netas para alcanzar ${target} MMR.`;
}

$("winrate").addEventListener("input", calculate);
$("calculate").addEventListener("click", calculate);
$("target").addEventListener("input", () => {
  const current = Number($("resultMmr").textContent) || 0;
  const change = Number($("change").value) || 1;
  updateTarget(current, change);
});
["mmr","change","games"].forEach(id => $(id).addEventListener("input", calculate));

renderRankList();
calculate();
