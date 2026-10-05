document.getElementById('calculateBtn').addEventListener('click', function() {
    const mmr = parseInt(document.getElementById('mmrInput').value);
    const resultContainer = document.getElementById('resultContainer');
    const rankOutput = document.getElementById('rankOutput');
    const rankStatsOutput = document.getElementById('rankStatsOutput');

    if (isNaN(mmr) || mmr < 0) {
        alert('Por favor, introduce un valor de MMR válido.');
        return;
    }

    let rango = "";
    let porcentaje = "";

    // Rangos aproximados estándar (basados en 2v2 / estandar general)
    if (mmr < 350) {
        rango = "Bronce";
        porcentaje = "Aproximadamente el 5% de los jugadores se encuentran aquí o por debajo.";
    } else if (mmr < 600) {
        rango = "Plata";
        porcentaje = "Formas parte del ~15% de jugadores en este nivel.";
    } else if (mmr < 900) {
        rango = "Oro";
        porcentaje = "Te sitúas en el rango más poblado, alrededor del 30% de la base total.";
    } else if (mmr < 1150) {
        rango = "Platino";
        porcentaje = "Estás en el top del ~25% de jugadores. ¡Buen nivel competitivo!";
    } else if (mmr < 1400) {
        rango = "Diamante";
        porcentaje = "¡Felicidades! Estás en el exclusivo grupo del ~15% superior.";
    } else if (mmr < 1700) {
        rango = "Campeón";
        porcentaje = "Eres parte del selecto ~7% de jugadores de alto rendimiento.";
    } else if (mmr < 2000) {
        rango = "Gran Campeón (Grand Champion)";
        porcentaje = "¡Impresionante! Solo el ~1.5% de todo el mundo alcanza este rango.";
    } else {
        rango = "Leyenda Supersónica (SSL)";
        porcentaje = "¡Élite mundial! Menos del 0.05% de los jugadores alcanzan esta categoría.";
    }

    rankOutput.textContent = rango;
    rankStatsOutput.textContent = porcentaje;
    resultContainer.style.display = 'block';
});
