/* --------------------------------------------------------------------------------------------- */
/* Calculadora de Masa Corporal */

/* Función para calcular el Indice de masa corporal por persona */
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Función para validar si los valores ingresados son  números y no otros caracteres.
// Uso el simbolo ! para invertir la logica

function validarNumero(numero) {
    return !isNaN(numero) && isFinite(numero);
}

/* Función principal */
function calcularIMCpersona() {
    let arrayPersonas = [];
    let cantidadPersonas = parseInt(prompt("Ingrese la cantidad de personas para las que desea calcular el Indice de masa corporal:"));

    // Validar que la cantidad de personas ingresada sea un número válido
    if (cantidadPersonas <= 0 || !validarNumero(cantidadPersonas)) {
        alert("La cantidad de personas debe ser un número válido mayor que cero.");

    }

    // Pedir datos para cada persona y calcular su IMC
    for (let i = 0; i < cantidadPersonas; i++) {
        let nombre = prompt("Ingrese el nombre de la persona " + (i + 1));
        let peso = parseFloat(prompt("Ingrese el peso de la persona " + (i + 1) + " en kilogramos:"));
        let altura = parseFloat(prompt("Ingrese la altura de la persona " + (i + 1) + " en metros:"));

        // Validar que los datos ingresados sean números válidos
        if (peso <= 0 || altura <= 0 || !validarNumero(peso) || !validarNumero(altura)) {
            alert("Los valores ingresados para el peso y la altura deben ser números válidos mayores que cero.");

        }

        let IMC = calcularIMC(peso, altura);
        

        // Determinar el mensaje según el rango de IMC
        switch (true) {
            case (IMC < 18.5):
                mensaje = "por debajo del peso saludable.";
                break;
            case (IMC >= 18.5 && IMC < 25):
                mensaje = "con un peso saludable.";
                break;
            case (IMC >= 25):
                mensaje = "por encima del peso saludable.";
                break;
        }

        // Mostrar el resultado del IMC y el mensaje de estado
        alert(nombre + " tiene un IMC de " + IMC.toFixed(1) + "." + "\nEstá " + mensaje);


        // Agregar los datos de IMC al array de personas
        arrayPersonas.push({
            nombre: nombre,
            IMC: IMC
        });

    }

    // Mostrar los resultados en el HTML
    arrayPersonas.forEach(persona => {
        let nuevoelementoLi = document.createElement('li');
        nuevoelementoLi.innerHTML = `ID:${persona.nombre} - IMC: ${persona.IMC.toFixed(1)}`;
        listado.appendChild(nuevoelementoLi);
    });

    // Guardar los datos en el localStorage
    const IMCJSON = JSON.stringify(arrayPersonas)
    localStorage.setItem('arrayPersonas',IMCJSON );
}

// Obtener el botón y agregar el evento click
let IMCboton = document.getElementById("calcularIMCButton")
IMCboton.addEventListener("click", calcularIMCpersona);