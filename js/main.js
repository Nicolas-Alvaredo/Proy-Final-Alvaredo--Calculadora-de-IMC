// Función para calcular el índice de masa corporal (IMC)
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Función para mostrar el formulario y agregar campos dinámicamente
function mostrarFormularioIMC(cantidadPersonas) {
    let formularioIMC = document.getElementById("formularioIMC");
    formularioIMC.style.display = "block";

    let calcularIMCForm = document.getElementById("calcularIMCForm");
    calcularIMCForm.innerHTML = ""; // Limpiar contenido anterior

    // Agregar campos para cada persona
    for (let i = 0; i < cantidadPersonas; i++) {
        let divPersona = document.createElement("div");

        let nombreLabel = document.createElement("label");
        nombreLabel.textContent = "Nombre de la persona " + (i + 1) + ": ";
        divPersona.appendChild(nombreLabel);

        let nombreInput = document.createElement("input");
        nombreInput.type = "text";
        nombreInput.name = "nombre" + i;
        divPersona.appendChild(nombreInput);

        let pesoLabel = document.createElement("label");
        pesoLabel.textContent = "Peso (kg) de la persona " + (i + 1) + ": ";
        divPersona.appendChild(pesoLabel);

        let pesoInput = document.createElement("input");
        pesoInput.type = "number";
        pesoInput.name = "peso" + i;
        divPersona.appendChild(pesoInput);

        let alturaLabel = document.createElement("label");
        alturaLabel.textContent = "Altura (metros) de la persona " + (i + 1) + ": ";
        divPersona.appendChild(alturaLabel);

        let alturaInput = document.createElement("input");
        alturaInput.type = "number";
        alturaInput.step = "0.01"; // Permitir números decimales con un paso de 0.01
        alturaInput.name = "altura" + i;
        divPersona.appendChild(alturaInput);

        calcularIMCForm.appendChild(divPersona);
    }

    // Agregar el botón de enviar al final del formulario
    let botonEnviar = document.createElement("button");
    botonEnviar.type = "button"; // Cambiar el tipo a "button"
    botonEnviar.textContent = "Calcular IMC";
    calcularIMCForm.appendChild(botonEnviar);

    // Agregar un controlador de eventos al botón de enviar
    botonEnviar.addEventListener("click", function () {
        // Limpiar resultados anteriores
        let listadoIMC = document.getElementById("listadoIMC");
        listadoIMC.innerHTML = "";

        // Verificar si todos los campos están completos
        let camposCompletos = true;
        let arrayPersonas = [];
        for (let i = 0; i < cantidadPersonas; i++) {
            let nombre = document.querySelector(`input[name='nombre${i}']`).value;
            let peso = parseFloat(document.querySelector(`input[name='peso${i}']`).value);
            let altura = parseFloat(document.querySelector(`input[name='altura${i}']`).value);

            if (nombre === "" || isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
                mostrarError("Por favor, complete todos los campos correctamente para todas las personas.");
                camposCompletos = false;
                break;
            }

            let IMC = calcularIMC(peso, altura);

            // Agregar los datos de IMC al array de personas
            arrayPersonas.push({
                nombre: nombre,
                IMC: IMC
            });
        }

        // Si todos los campos están completos, calcular y mostrar el IMC
        if (camposCompletos) {
            arrayPersonas.forEach(persona => {
                let mensaje;
                if (persona.IMC < 18.5) {
                    mensaje = "por debajo del peso saludable.";
                } else if (persona.IMC >= 18.5 && persona.IMC < 25) {
                    mensaje = "con un peso saludable.";
                } else {
                    mensaje = "por encima del peso saludable.";
                }

                // Mostrar el resultado del IMC en la lista
                let nuevoElementoLi = document.createElement("li");
                nuevoElementoLi.textContent = `${persona.nombre} tiene un IMC de ${persona.IMC.toFixed(1)}. Está ${mensaje}`;
                listadoIMC.appendChild(nuevoElementoLi);
            });

            // Guardar los datos en el localStorage
            localStorage.setItem('arrayPersonas', JSON.stringify(arrayPersonas));


            // Obtener el valor extra del archivo JSON
            fetch('json/imc_promedio_mundial.json')
                .then(response => response.json())
                .then(data => {
                    let IMCmundial = data.promedio;
                    let IMCmundialElemento = document.createElement("p");
                    IMCmundialElemento.textContent = `Nota:"El promedio de IMC mundial es de: ${IMCmundial}"`;
                    IMCmundialElemento.style.marginTop = "10px";
                    listadoIMC.appendChild(IMCmundialElemento);
                })
                .catch(error => {
                    console.error('Error al obtener el valor extra del JSON:', error);
                });



            // Mostrar alerta de exito SweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡IMC calculado correctamente!',
                text: 'Los resultados se han calculado y mostrado correctamente.'
            });

        }
    });
}

// Obtener el formulario para la cantidad de personas
let cantidadPersonasForm = document.getElementById("cantidadPersonasForm");
cantidadPersonasForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto

    let cantidadPersonas = parseInt(document.getElementById("cantidadPersonas").value);
    if (cantidadPersonas <= 0 || isNaN(cantidadPersonas)) {
        mostrarError("La cantidad de personas debe ser un número válido mayor que cero.");
        return;
    }

    mostrarFormularioIMC(cantidadPersonas);
});


// Función para mostrar un mensaje de error como un cuadro emergente usando SweetAlert
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje
    });
}