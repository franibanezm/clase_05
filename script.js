/* 
Índice de intesidad de uso del cobre por país en Datos.gob (repositorio de datos abiertos centralizado del Estado)
Fuente: https://datos.gob.cl/dataset/indice-de-intesidad-de-uso-del-cobre-por-pais/resource/6b2ce9f5-f23a-41ef-961a-1e9939e00c10
Preferí "limpiar" los datos antes de utilizarlos. La versión "limpia" la dejé en GitHub
*/
Papa.parse("https://raw.githubusercontent.com/franibanezm/clase_05/main/vacunas_covid19.csv", {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (respuesta) {
        // asómense a la consola para ver toda la respuesta
        //console.log(respuesta);
        // necesitamos solo una parte de toda la respuesta
        var datos = respuesta.data;
        // para eliminar una fila de sobra al final, borrar el doble slash en la siguiente línea
        // datos.pop();

        if (document.body.classList.contains("portada")) {
            datos.forEach(function (dato, i) {
                document.querySelector("main").innerHTML += "<article><a href='page.html?pais=" + i + "'>" + dato.paises + "</article>";
            }); // cierra el forEach
        } else {
            var f = new URLSearchParams(window.location.search).get("pais");
            console.log(f);
            if(window.innerHeight > window.innerWidth){
                document.querySelector("#grafico").setAttribute("height", "100");
            }
            if (f !== null) {
                document.querySelector("h2").append(datos[f].paises);
                var indice = [];
                indice.push(datos[f].enero);
                indice.push(datos[f].eneroo);
                indice.push(datos[f].febrero);
                indice.push(datos[f].febreroo);
                indice.push(datos[f].marzo);
                indice.push(datos[f].marzoo);
                indice.push(datos[f].abril);
      

                new Chart(document.querySelector("#grafico").getContext("2d"), {
                    type: "line",
                    data: {
                        labels: ["7 de Enero", "23 de Enero", "8 de Febrero", "24 de febero", "12 de Marzo", "28 de Marzo", "13 de Abril"],
                        datasets: [
                            {
                                data: indice,
                                backgroundColor: "rgba(49, 140, 136, .2)",
                                borderColor: "rgba(49, 140, 136, .5)",
                                pointBackgroundColor: "rgba(49, 140, 136, 1)",
                                pointBorderColor: "rgba(49, 140, 136, 1)",

                                pointRadius: 4,
                                borderWidth: 2,
                                lineTension: 0,
                            },
                        ],
                    },
                    options: {
                        layout: {
                            padding: { left: 15, right: 20, top: 20, bottom: 10
                            }
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                        fontColor: "rgba(0, 0, 0, 0.75)",
                                        fontFamily: "helvetica, arial, san-serif",
                                        fontSize: 12,
                                    },
                                },
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        fontColor: "rgba(0, 0, 0, 0.75)",
                                        fontFamily: "helvetica, arial, san-serif",
                                        fontSize: 12,
                                    },
                                },
                            ],
                        },
                    },
                }); // cierra new Chart
            } else {
                document.querySelector("main").innerHTML = "<article>Algo salió mal &#128557;</article>";
            } // cierra else
        } // cierra else
    }, // cierra function(respuesta){}
}); // cierra Papa.parse