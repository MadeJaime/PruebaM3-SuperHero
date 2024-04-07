// Trae documentacion SuperHero
$(document).ready(function () {
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    const buscarHero = $("#superHero").val().trim();
    if (!buscarHero.match(/^\d+$/)) {
      alert("Por favor, ingresa solo números.");
      return;
    };

    // Constante Api y Key
    const apiKey = "4905856019427443";
    const apiUrl = `https://superheroapi.com/api.php/${apiKey}/${buscarHero}`;

    // Llamada a la API para traer SuperHero
    $.ajax({
      url: apiUrl,
      method: "GET",
      dataType: "json",
      success: function (datosHero) {
        console.log(datosHero) // Muestra la respuesta en la consola
        let detalles = datosHero;
        let detallesNombre = detalles.name;
        let cardHtml = `<h2>SuperHero Encontrado: ${detallesNombre}<h2>
        <div class="card mb-3" style=height: 40%; width: 90%;">
      <div class="row g-0>
        <div class="col-md-4">
          <img id="heroImage" src="${datosHero.image.url}" style="height: 60%; width: 90%; "class="card-img-top img-fluid" alt="">
      </div>
          <div class=col-md-5">
            <div class="card-body">
            <p class="card-text">Nombre: ${datosHero.name} <br> <br>Connections: ${datosHero.connections["group-affiliation"]}<br> </p>
            <p class="card-text">Publisher: ${datosHero.biography.publisher} <hr> Occupation: ${datosHero.work.occupation} <hr> First Appearance</p>
          </div>
        </div>`

        $("#card").html(cardHtml)

        // CanvaJS
        var chart = new CanvasJS.Chart("container", {
          theme: "light2",
          exportEnabled: true,
          animationEnables: true,
          title: {
            text: "Estadisticas de Poder " + "" + detallesNombre
          },
          data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - ({y})",
            dataPoints: [
              { y: parseInt(datosHero.powerstats.intelligence), label: "Intelligence" },
              { y: parseInt(datosHero.powerstats.strength), label: "Strength" },
              { y: parseInt(datosHero.powerstats.speed), label: "Speed" },
              { y: parseInt(datosHero.powerstats.durability), label: "Durability" },
              { y: parseInt(datosHero.powerstats.power), label: "Power" },
              { y: parseInt(datosHero.powerstats.combat), label: "Combat" },

            ]
          }]
        });

        chart.render();

      },

      // En caso de error
      error: function (xhr, status, error) {
        alert('Error al buscar el SuperHero. Inténtalo de nuevo más tarde.');
        console.error(error);
      },
    });
  });
});

