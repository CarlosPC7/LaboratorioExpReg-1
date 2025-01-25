import { estaBienFormadoIban  } from "./validacion";

import { expect } from 'chai';

describe("estaBienFormadoIban", () => { 
  test.each([ 
    ["ES21 1465 0100 72 2030876293", true], 
    ["ES2114650100722030876293", true], 
    ["ES21-1465-0100-72-2030876293", true], 
    ["ES6621000418401234567891", true], 
  ])( 
"Deberia devolver para el IBAN", (valor: string, expected: boolean) => { 
      expect(estaBienFormadoIban(valor)).toBe(expected); 
    } 
  ); 
}); 
