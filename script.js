// Lógica de la calculadora con los datos exactos de la foto de 2v2
document.getElementById('calculateBtn').addEventListener('click', function() {
    const mmr = parseInt(document.getElementById('mmrInput').value);
    const resultContainer = document.getElementById('resultContainer');
    const rankOutput = document.getElementById('rankOutput');
    const divisionOutput = document.getElementById('divisionOutput');
    const rankStatsOutput = document.getElementById('rankStatsOutput');

    if (isNaN(mmr) || mmr < 0) {
        alert('Por favor, introduce un número de MMR válido.');
        return;
    }

    let rango = "";
    let desc = "";

    if (mmr >= 1860) {
        rango = "Supersonic Legend";
        desc = "¡Eres parte de la élite mundial absoluta de Rocket League!";
    } else if (mmr >= 1715) {
        rango = "Grand Champion III";
        desc = "Nivel profesional altísimo.";
    } else if (mmr >= 1574) {
        rango = "Grand Champion II";
        desc = "Dominio absoluto del juego y velocidad extrema.";
    } else if (mmr >= 1435) {
        rango = "Grand Champion I";
        desc = "¡El codiciado rango de Gran Campeón!";
    } else if (mmr >= 1315) {
        rango = "Champion III";
        desc = "A las puertas de Grand Champion.";
    } else if (mmr >= 1195) {
        rango = "Champion II";
        desc = "Gran nivel técnico y táctico.";
    } else if (mmr >= 1075) {
        rango = "Champion I";
        desc = "¡Bienvenido al rango morado de Campeón!";
    } else if (mmr >= 995) {
        rango = "Diamond III";
        desc = "Muy cerca del rango morado.";
    } else if (mmr >= 915) {
        rango = "Diamond II";
        desc = "Excelente posicionamiento y consistencia.";
    } else if (mmr >= 835) {
        rango = "Diamond I";
        desc = "¡Entraste en Diamante!";
    } else if (mmr >= 774) {
        rango = "Platinum III";
        desc = "Alto nivel de platino.";
    } else if (mmr >= 713) {
        rango = "Platinum II";
        desc = "Control aéreo básico dominado.";
    } else if (mmr >= 654) {
        rango = "Platinum I";
        desc = "¡Bienvenido a Platino!";
    } else if (mmr >= 594) {
        rango = "Gold III";
        desc = "A un paso de Platino.";
    } else if (mmr >= 535) {
        rango = "Gold II";
        desc = "Buen dominio de los tiros a puerta.";
    } else if (mmr >= 475) {
        rango = "Gold I";
        desc = "¡Rango Oro alcanzado!";
    } else if (mmr >= 410) {
        rango = "Silver III";
        desc = "Plata avanzado.";
    } else if (mmr >= 352) {
        rango = "Silver II";
        desc = "Mejorando los giros y contacto con el balón.";
    } else if (mmr >= 288) {
        rango = "Silver I";
        desc = "¡Rango Plata!";
    } else if (mmr >= 238) {
        rango = "Bronze III";
        desc = "Bronce alto.";
    } else {
        rango = "Bronze II / Bronze I";
        desc = "Comenzando tu aventura en el juego.";
    }

    rankOutput.textContent = rango;
    divisionOutput.textContent = "Divisiones orientativas: DIV IV - III - II - I";
    rankStatsOutput.textContent = desc;
    resultContainer.style.display = 'block';
});

// Lógica para los botones de pestañas (navegación limpia)
const buttons = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.content-section');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active-section'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active-section');
    });
});
