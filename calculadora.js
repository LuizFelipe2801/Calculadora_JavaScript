onload = () => {
  document.querySelector("#bt-0").onclick = () => digito(0);
  document.querySelector("#bt-1").onclick = () => digito(1);
  document.querySelector("#bt-2").onclick = () => digito(2);
  document.querySelector("#bt-3").onclick = () => digito(3);
  document.querySelector("#bt-4").onclick = () => digito(4);
  document.querySelector("#bt-5").onclick = () => digito(5);
  document.querySelector("#bt-6").onclick = () => digito(6);
  document.querySelector("#bt-7").onclick = () => digito(7);
  document.querySelector("#bt-8").onclick = () => digito(8);
  document.querySelector("#bt-9").onclick = () => digito(9);
  document.querySelector("#bt-comma").onclick = virgula;
  document.querySelector("#bt-ac").onclick = limpa;
  document.querySelector("#bt-divide").onclick = () => operador("/");
  document.querySelector("#bt-times").onclick = () => operador("*");
  document.querySelector("#bt-minus").onclick = () => operador("-");
  document.querySelector("#bt-plus").onclick = () => operador("+");
  document.querySelector("#bt-equals").onclick = calcula;
};

let sValor = "0"; 
let ehNovoNumero = true; 
let valorAnterior = 0; 
let operacaoPendente = null;

const atualizaVisor = () => {
  let [parteInteira, parteDecimal] = sValor.split(",");
  if (parteInteira.length > 10) {
    document.querySelector("#display").innerText = "Erro";
    return;
  }
  let v = "";
  c = 0;
  for (let i = parteInteira.length - 1; i >= 0; i--) {
    if (++c > 3) {
      v = "." + v;
      c = 1;
    }
    v = parteInteira[i] + v;
  }
  v = v + (parteDecimal ? "," + parteDecimal.substr(0, 10 - v.length) : "");
  document.querySelector("#display").innerText = v;
};

const digito = (n) => {
  if (ehNovoNumero) {
    sValor = "" + n;
    ehNovoNumero = false;
  } else sValor += n;
  atualizaVisor();
};

const virgula = () => {
  if (ehNovoNumero) {
    sValor = "0,";
    ehNovoNumero = false;
  } else if (sValor.indexOf(",") == -1) sValor += ",";
  atualizaVisor();
};

const limpa = () => {
  ehNovoNumero = true;
  valorAnterior = 0;
  sValor = "0";
  operacaoPendente = null;
  atualizaVisor();
};

const valorAtual = () => parseFloat(sValor.replace(",", "."));

const operador = (op) => {
  calcula();
  valorAnterior = valorAtual();
  operacaoPendente = op;
  ehNovoNumero = true;
};

const calcula = () => {
  if (operacaoPendente != null) {
    let resultado;
    switch (operacaoPendente) {
      case "+":
        resultado = valorAnterior + valorAtual();
        break;
      case "-":
        resultado = valorAnterior - valorAtual();
        break;
      case "*":
        resultado = valorAnterior * valorAtual();
        break;
      case "/":
        resultado = valorAnterior / valorAtual();
        break;
    }
    sValor = resultado.toString().replace(".", ",");
  }
  ehNovoNumero = true;
  operacaoPendente = null;
  valorAnterior = 0;
  atualizaVisor();
};
