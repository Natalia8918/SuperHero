$('form').on('submit', (event) => {
    event.preventDefault();
    $("#resultado").html(" ");
    $("#chartContainer").html(" ");
    hero = parseInt($('#hero').val());
    consulta(hero);
});

let consulta = (hero) => {
    $.ajax({
        dataType: "json",
        type: "get",
        url: `https://superheroapi.com/api.php/10228052014908009/${hero}`,
        success: (result) => {
            if (result.response === 'success') {
                let resultado1 = `
                        <h3 class="test-center">SuperHero Encontrado</h3>
                        <div class="card">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src="${result.image.url}" class="card-img" alt="${result.name}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Nombre: ${result.name}</h5>
                                        <p class="card-text">Conexiones: ${result.connections['group-affiliation']}</p>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><em>Publicado por:</em> ${result.biography.publisher}</li>
                                            <li class="list-group-item"><em>Ocupación:</em> ${result.work.occupation}</li>
                                            <li class="list-group-item"><em>Primera Aparición:</em> ${result.biography['first-appearance']}</li>
                                            <li class="list-group-item"><em>Altura:</em> ${result.appearance.height.join(" - ")}.</li>
                                            <li class="list-group-item"><em>Peso:</em> ${result.appearance.weight.join(" - ")}.</li>
                                            <li class="list-group-item"><em>Alianzas:</em>
                `;
                let resultado2 = "";
                resultado2 = result.biography.aliases.join(', ');
                let resultado3 = `
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                $('#resultado').append(resultado1 + resultado2 + resultado3);
                let datosXY = [];
                for (const key in result.powerstats) {
                    datosXY.push({
                        label: key,
                        y: parseInt(result.powerstats[key])
                    });
                };

                var options = {
                    title: {
                        text: `Estadísticas de Poder para ${result.name}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 45,
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabel: "{label} ({y})",
                        yValueFormatString: "#,##0.#" % "",
                        dataPoints: datosXY
                    }]
                };

                $("#chartContainer").CanvasJSChart(options);
            } else {
                alert("El ID no se encuentra");
            };
        },
        error: () => {
            alert("Erro al consultar los datos");
        }
    })
}