import {esValidoIban, ibanNoValidado, ibanValidado} from './vallidacion.helpers';

// Validar que estén bien formados

export const estaBienFormadoIban = (value: string): boolean => { 
    const patron = /^[A-Z]{2}\d{2}(\s|-)?(\d{4}(\s|-)?){2}\d{2}(\s|-)?\d{10}$/;

    return patron.test(value); 
};

/*
ES21 1465 0100 72 2030876293

ES2114650100722030876293

ES21-1465-0100-72-2030876293

ES6621000418401234567891
*/

export const mostrarCodigos = () => {
  const inputIban = document.getElementById("input-iban");

  if (inputIban && inputIban instanceof HTMLInputElement) {
    const iban = inputIban.value;
    validaIban(iban);
  }
}

const validaIban = (iban: string) => {
  const limpiaIban = iban.replace(/[\s-]/g, "");
  const esValido = esValidoIban(limpiaIban);
  console.log(esValido)
  esValido ? ibanValidado(limpiaIban) : ibanNoValidado();
}