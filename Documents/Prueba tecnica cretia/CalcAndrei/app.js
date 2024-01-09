// Obtener el elemento de la pantalla
const display = document.getElementById("pantalla");

// Función para añadir un valor al contenido de la pantalla
function appendToDisplay(value) {
  display.value += value;
}

// Función para limpiar el contenido de la pantalla
function clearDisplay() {
  display.value = "";
}

// Función para calcular el resultado de la expresión en la pantalla
function calculateResult() {
  try {
    const expressionResult = eval(display.value);

    // Mostrar el resultado en la pantalla con formato
    display.value = formatResult(expressionResult);
  } catch (error) {
    // Manejar errores y mostrar un mensaje en la pantalla
    display.value = "Error";
  }
}
function formatResult(result) {
  // Redondear el resultado a 4 decimales si es un número decimal
  if (Number.isFinite(result) && result % 1 !== 0) {
    return result.toFixed(4);
  }

  return result;
}
