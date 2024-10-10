//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA VALIDAÇÃO DE CADASTRO PESSOA FÍSICA*/

// VARIÁVEIS
const cpf = document.getElementById('icpf');
const nomeCompleto = document.getElementById('inome-completo');
const telefone = document.getElementById('itelefone');
const formValidate = document.getElementById('form-pessoa-fisica');

// BLOQUEANDO CARACTERES NÃO NUMÉRICOS
cpf.addEventListener('input', function (event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

telefone.addEventListener('input', function (event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// LIMITANDO QUANTIDADE DE CARACTERES
formValidate.addEventListener('submit', function (event) {
    if (formCpf.value.length !== 11) {
        event.preventDefault();
        formCpf.value = '';
        window.alert('CPF inválido, tente novamente!');
    }
});

// CONVERTENDO CARACTERES PARA LETRAS MAIÚSCULAS
nomeCompleto.addEventListener('input', function() {
    this.value = this.value.toUpperCase();
});

// REMOVENDO ESPAÇOS EM BRANCO ENTRE CARACTERES
function removeSpaces(text) {
    return text.replace(/\s+/g, ' ').trim();
}

formValidate.addEventListener('submit', function() {
    nomeCompleto.value = removeSpaces(nomeCompleto.value);
});

//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA VALIDAÇÃO DE CADASTRO PESSOA JURÍDICA*/