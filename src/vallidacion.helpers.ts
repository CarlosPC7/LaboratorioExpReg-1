import { isValidBBAN } from "ibantools";
import { Validador } from "./validacion.model";
import bancos from './bancos.json';

export const esValidoIban = (iban: string) => isValidBBAN(iban);

export const ibanValidado = (iban: string) => {
  const codigosExtraidos = extraeCodigos(iban);
  mostrarCodigosIban(codigosExtraidos);
};

const extraeCodigos = (iban: string): Validador => {
  const patron = /^((?<codigoPais>[A-Z]{2})(?<digitoControl1>\d{2}))(?<codigoBanco>\d{4})(?<codigoSucursal>\d{4})(?<digitoControl2>\d{2})(?<numeroCuenta>\d{10})$/;

  const coincidencias = patron.exec(iban);

  if (coincidencias) {
    const {
      codigoPais,
      digitoControl1,
      codigoBanco,
      codigoSucursal,
      digitoControl2,
      numeroCuenta,
    } = coincidencias.groups as any;

    return {
      codigoPais,
      digitoControl1,
      codigoBanco,
      codigoSucursal,
      digitoControl2,
      numeroCuenta,
    };
  };

  throw new Error('No se pudo extraer el código IBAN');
};

type Bancos = {
  [codigoBanco: string]: string;
};

const bancosTyped: Bancos = bancos;

const devolverNombreBanco = (codigoBanco: string): string => {
  return bancosTyped[codigoBanco] || "Banco no encontrado";
};

const crearTexto = (texto: string): HTMLDivElement => {
  const div = document.createElement("div");
  div.textContent = texto;
  return div;
}

const mostrarCodigosIban = (validador: Validador) => {
  const contenedor = document.getElementById("contenedor-IBAN");
  if (contenedor && contenedor instanceof HTMLDivElement) {
    contenedor.textContent = "";

    const textoCodigoBanco = crearTexto(
      "Banco:" + devolverNombreBanco(validador.codigoBanco)
    );

    const textoCodigoSucursal = crearTexto(
      "Código Sucursal:" + validador.codigoSucursal
    );

    const textoDigitoControl2 = crearTexto(
      "Digito Control:" + validador.digitoControl2
    );

    const textoNumeroCuenta = crearTexto(
      "Número cuenta:" + validador.numeroCuenta
    );

    contenedor.appendChild(textoCodigoBanco);
    contenedor.appendChild(textoCodigoSucursal);
    contenedor.appendChild(textoDigitoControl2);
    contenedor.appendChild(textoNumeroCuenta);
  }
}

export const ibanNoValidado = () => {
  const contenedor = document.getElementById("contenedor-IBAN");
  if (contenedor && contenedor instanceof HTMLDivElement) {
    contenedor.textContent = "";

    const mensajeError = crearTexto(
      "El IBAN proporcionado no es válido. Por favor, revisa e inténtalo de nuevo."
    );

    contenedor.appendChild(mensajeError);
  }
}
