/** @format */

function validarBandeira(cartaoNumero) {
  const bandeiras = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  for (let bandeira in bandeiras) {
    if (bandeiras[bandeira].test(cartaoNumero)) {
      return bandeira;
    }
  }

  return "Bandeira desconhecida";
}

function validarLuhn(cartaoNumero) {
  let soma = 0;
  let alternar = false;

  for (let i = cartaoNumero.length - 1; i >= 0; i--) {
    let n = parseInt(cartaoNumero.charAt(i), 10);
    if (alternar) {
      n *= 2;
      if (n > 9) {
        n -= 9;
      }
    }
    soma += n;
    alternar = !alternar;
  }
  return soma % 10 === 0;
}

const numeroCartao = "30230926357093".replace(/\D/g, "");

if (!validarLuhn(numeroCartao)) {
  console.log("Número de cartão inválido");
} else {
  console.log("Bandeira do cartão:", validarBandeira(numeroCartao));
}
