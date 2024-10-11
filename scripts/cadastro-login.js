//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA VALIDAÇÃO DE CADASTRO PESSOA FÍSICA*/

// VARIÁVEIS
const cpf = document.getElementById('icpf');
const nomeCompleto = document.getElementById('inome-completo');
const telefone = document.getElementById('itelefone');

const formValidatePF = document.getElementById('form-pessoa-fisica');
const formValidatePJ = document.getElementById('form-pessoa-juridica');

const btnPessoal = document.getElementById('label-perfil-pessoal');
const btnEmpresarial = document.getElementById('label-perfil-empresarial');

// BLOQUEANDO CARACTERES NÃO NUMÉRICOS
cpf.addEventListener('input', function (event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

telefone.addEventListener('input', function (event) {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// LIMITANDO QUANTIDADE DE CARACTERES
formValidatePF.addEventListener('submit', function (event) {
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

formValidatePF.addEventListener('submit', function() {
    nomeCompleto.value = removeSpaces(nomeCompleto.value);
});

//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA VALIDAÇÃO DE CADASTRO PESSOA JURÍDICA*/

//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA INTERAÇÃO DO BOTÃO PERFIL PESSOAL/EMPRESARIAL*/

// FUNÇÃO PARA "ATIVAR" O BOTÃO E OCULTAR O QUE NÃO FOI SELECIONADO
function btnPerfilPessoal() {
    btnPessoal.id = 'label-perfil-pessoal-enabled';
    btnEmpresarial.id = 'label-perfil-empresarial';
    formValidatePF.style.display = 'flex';
    formValidatePJ.style.display = 'none';
}

function btnPerfilEmpresarial() {
    btnEmpresarial.id = 'label-perfil-empresarial-enabled';
    btnPessoal.id = 'label-perfil-pessoal';
    formValidatePJ.style.display = 'flex';
    formValidatePF.style.display = 'none';
}

//////////////////////////////////////////////////////////////////////