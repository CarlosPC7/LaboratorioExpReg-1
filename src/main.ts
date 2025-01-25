import {mostrarCodigos} from './validacion';

const botonValidar = document.getElementById("search-iban");

const muestraResultados = () => {
  if (botonValidar && botonValidar instanceof HTMLButtonElement) {
    botonValidar.addEventListener("click", mostrarCodigos)
  }
};

document.addEventListener("DOMContentLoaded", muestraResultados);