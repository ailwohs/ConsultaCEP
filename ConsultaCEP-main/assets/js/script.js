/* máscara do cep */

// seleciona o elemento input
const cepInput = document.getElementById("cep");
let cepDesmascarado;
// adiciona o evento keyup
cepInput.addEventListener("keyup", (event) => {
  // declara o value do elemento na variável do cep desmascarado
  // remove tudo que não for número
  let cep = event.target.value.replace(/\D/g, "");

  // adiciona a máscara de CEP
  cep = cep.replace(/^(\d{5})(\d{3})/, '$1-$2');

  // atualiza o valor do input
  event.target.value = cep;

  // atualiza o valor do cep desmascarado.
  cepDesmascarado = cep.replace(/\D/g, "");
});

function consultar() {
    const apiUrl = `https://viacep.com.br/ws/${cepDesmascarado}/json/`;
    console.log(apiUrl);
    // realiza a requisição HTTP usando fetch
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // verifica se a consulta retornou um endereço válido
        if (data.erro) {
          // pega a div do erro e remove o hidden para aparecer o erro
          const erroDiv = document.querySelector('.erro');
          erroDiv.classList.remove('hidden');
        } else {
          // verifica se o classList da div não contém o hidden, se não tiver, ele adiciona para o próximo resultado
          const erroDiv = document.querySelector('.erro');
          if (!erroDiv.classList.contains('hidden'))
            erroDiv.classList.add('hidden');
          // remove o hidden da div para mostrar o resultado
          const resultadoDiv = document.querySelector('.resultado');
          resultadoDiv.classList.remove('hidden');
          // atualiza os campos na página com os dados retornados pela API
          document.querySelector('#cepLabel').textContent = `Resultado: ${data.cep}`;
          document.querySelector('#endereco').textContent = data.logradouro;
          document.querySelector('#bairro').textContent = data.bairro;
          document.querySelector('#cidade').textContent = data.localidade;
          document.querySelector('#estado').textContent = data.uf;
          document.querySelector('#pais').textContent = 'Brasil';
        }
      })
      .catch(error => console.error(error));
      
    // limpa o resultado anterior
    const resultadoDiv = document.querySelector('.resultado');
    resultadoDiv.classList.add('hidden');
    document.querySelector('#cepLabel').textContent = 'Resultado:';
    document.querySelector('#endereco').textContent = '';
    document.querySelector('#bairro').textContent = '';
    document.querySelector('#cidade').textContent = '';
    document.querySelector('#estado').textContent = '';
    document.querySelector('#pais').textContent = '';
}
