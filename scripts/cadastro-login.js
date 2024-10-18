//////////////////////////////////////////////////////////////////////

// VARIÁVEIS
const cpf = document.getElementById('icpf');
const nomeCompleto = document.getElementById('inome-completo');
const telefone = document.getElementById('itelefone');
const local = document.getElementById('ilocal');
const email = document.getElementById('iemail');

const campoUsuarioPF = document.getElementById('iuser');
const campoSenhaPF = document.getElementById('ipassword');
const campoConfirmSenhaPF = document.getElementById('ipassword002');
let forcaDaSenha = 'FRACA';

const campoForcaDaSenha = document.getElementById('container-password-level');
const barraForcaDaSenha = document.getElementById('rowbar-password-level');
const campoNivelDaSenha = document.getElementById('nivel-senha-span');
const nivelDaSenhaReal = document.getElementById('nivel-senha-real');

const formValidatePF = document.getElementById('form-pessoa-fisica');
const formValidatePJ = document.getElementById('form-pessoa-juridica');

const btnPessoal = document.getElementById('label-perfil-pessoal');
const btnEmpresarial = document.getElementById('label-perfil-empresarial');


//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA INTERAÇÃO DO BOTÃO PERFIL PESSOAL/EMPRESARIAL*/

// FUNÇÃO PARA "ATIVAR" O BOTÃO DE ESCOLHER PERFIL E OCULTAR O QUE NÃO FOI SELECIONADO
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

/*SCRIPT PARA VALIDAÇÃO DE CADASTRO PESSOA FÍSICA*/

// BLOQUEANDO CARACTERES NÃO NUMÉRICOS NO CAMPO CPF E TELEFONE
cpf.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

telefone.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
});

// CONVERTENDO CARACTERES PARA LETRAS MAIÚSCULAS NO CAMPO NOME COMPLETO
nomeCompleto.addEventListener('input', function() {
    this.value = this.value.toUpperCase().replace(/[0-9]/g, '');
});

// MOSTRANDO A FORÇA DA SENHA NA TELA DO USUÁRIO
/*
>> Senha igual ao nome de usuário é considerada FRACA
>> Senha com menos de 10 caracteres é considerada FRACA
>> Senha com 1 número ou mais é considerada MÉDIA
>> Senha com 11 caracteres ou mais, pelo menos 1 número e com caracteres especiais é considerada FORTE
*/
campoSenhaPF.addEventListener('input', function() {

    // VARIÁVEIS PARA IDENTIFICAR SE A SENHA POSSUI NÚMEROS E CARACTERES ESPECIAIS
    const umNumeroOuMais = this.value.match(/[0-9]/g);
    const umCaracterEspecial = this.value.match(/[^a-zA-Z0-9]/g);

    if (this.value != '') {
        campoForcaDaSenha.style.display = 'flex';
        campoNivelDaSenha.style.display = 'flex';

    } else {
        campoForcaDaSenha.style.display = 'none';
        campoNivelDaSenha.style.display = 'none';
    }

    if (this.value == campoUsuarioPF.value) {
        forcaDaSenha = 'FRACA';
        barraForcaDaSenha.style.width = '5%';
        barraForcaDaSenha.style.backgroundColor = 'rgba(255, 0, 0, 0.877)';
        nivelDaSenhaReal.style.color = 'red';
        nivelDaSenhaReal.innerHTML = forcaDaSenha;

    } else if (this.value.length < 10) {
        forcaDaSenha = 'FRACA';
        barraForcaDaSenha.style.width = '3%';
        barraForcaDaSenha.style.backgroundColor = 'rgba(255, 0, 0, 0.877)';
        nivelDaSenhaReal.style.color = 'red';
        nivelDaSenhaReal.innerHTML = forcaDaSenha;

    } else if (umNumeroOuMais && umNumeroOuMais.length >= 1 && !umCaracterEspecial) {
        forcaDaSenha = 'MÉDIA';
        barraForcaDaSenha.style.width = '60%';
        barraForcaDaSenha.style.backgroundColor = 'rgba(255, 217, 0, 0.877)';
        nivelDaSenhaReal.style.color = 'rgba(255, 217, 0)';
        nivelDaSenhaReal.innerHTML = forcaDaSenha;

    } else if (this.value.length >= 11 && umNumeroOuMais && umNumeroOuMais.length >= 1 && umCaracterEspecial && umCaracterEspecial.length >= 1) {        
        forcaDaSenha = 'FORTE';
        barraForcaDaSenha.style.width = '95%';
        barraForcaDaSenha.style.backgroundColor = 'rgba(0, 255, 42, 0.877)';
        nivelDaSenhaReal.style.color = 'rgba(0, 255, 42)';
        nivelDaSenhaReal.innerHTML = forcaDaSenha;

    } else {
        console.log('A senha atende à todos os parâmetros!');
    }
});

// VALIDANDO DADOS PARA ENVIO DO FORMULÁRIO
formValidatePF.addEventListener('submit', function(event) {

    // LIMITANDO QUANTIDADE DE CARACTERES NO CAMPO CPF
    if (cpf.value.length !== 11) {
        event.preventDefault();
        cpf.value = '';
        window.alert('CPF inválido, tente novamente!');
    }

    // REMOVENDO ESPAÇOS EM BRANCO ENTRE CARACTERES NO CAMPO NOME COMPLETO
    function removeSpaces(text) {
        return text.replace(/\s+/g, ' ').trim();
    }
    nomeCompleto.value = removeSpaces(nomeCompleto.value);
    
    // REGRAS PARA CRIAÇÃO DO NOME DE USUÁRIO
    /*
    >> Deve conter no mínimo 10 caracteres e no máximo 20 caracteres
    >> Deve conter ao menos 1 letra maiúscula e ao menos 1 letra minúscula
    >> Deve conter ao menos 1 número
    >> Pode conter caracteres como "." ou "-" ou "_";
    >> Não pode conter caracteres especiais (exemplo: !, @, #, $, %)
    */
    
    // VERIFICANDO QUANTIDADE DE CARACTERES DO NOME DE USUÁRIO
    if (campoUsuarioPF.value.length >= 10 && campoUsuarioPF.value.length <= 20) {
        console.log('Nome de usuário: Quantidade de caracteres ok!');

        // VERIFICANDO SE O NOME DE USUÁRIO POSSUI ALGUMA LETRA MINÚSCULAS E MAIÚSCULAS
        const usuarioPossuiMinuscula = /[a-z]/.test(campoUsuarioPF.value);
        const usuarioPossuiMaiuscula = /[A-Z]/.test(campoUsuarioPF.value);

        if (usuarioPossuiMinuscula && usuarioPossuiMaiuscula) {
            console.log('Nome de usuário: Possui letras minúsculas e maiúsculas ok!');

            // VERIFICANDO SE O NOME DE USUÁRIO POSSUI ALGUM NÚMERO
            const usuarioPossuiNumero = /[0-9]/.test(campoUsuarioPF.value);

            if (usuarioPossuiNumero) {
                console.log('Nome de usuário: Possui números ok!');

                // VERIFICANDO SE O NOME DE USUÁRIO POSSUI CARACTERES ESPECIAIS
                const PossuiCaracteresEsp = /[^a-zA-Z0-9._-]/.test(campoUsuarioPF.value);

                if (!PossuiCaracteresEsp) {
                    console.log('Nome de usuário: Não possui caracteres especiais ok!');

                    // FIM DA VERIFICAÇÃO DO NOME DE USUÁRIO

                } else {
                    event.preventDefault();
                    campoUsuarioPF.value = '';
                    console.log('ERRO: O nome de usuário possui caracteres especiais!');
                    window.alert('ERRO: O nome de usuário não deve possuir caracteres especiais');
                }

            } else {
                event.preventDefault();
                campoUsuarioPF.value = '';
                console.log('ERRO: O nome de usuário não possui números!');
                window.alert('ERRO: O nome de usuário deve possuir pelo menos um número!');
            }

        } else {
            event.preventDefault();
            campoUsuarioPF.value = '';
            console.log('ERRO: O nome de usuário deve possuir pelo menos uma letra minúscula e maiúscula!');
            window.alert('ERRO: O nome de usuário deve possuir pelo menos uma letra minúscula e maiúscula!');
        }

    } else {
        event.preventDefault();
        campoUsuarioPF.value = '';
        console.log('ERRO: Quantidade de caracteres do nome de usuário inválida!');
        window.alert('ERRO: O nome de usuário deve possuir de 10 a 20 caracteres!');
    }

    // REGRAS PARA CRIAÇÃO DA SENHA
    /*
    >> Não pode ser igual ao nome de usuário
    >> Deve conter no mínimo 10 caracteres e no máximo 20 caracteres
    >> Deve conter ao menos 1 letra maiúscula e ao menos 1 letra minúscula
    >> Deve conter ao menos 1 número
    */

    // VERIFICANDO QUANTIDADE DE CARACTERES
    if (campoSenhaPF.value.length >= 10 && campoSenhaPF.value.length <= 20) {
        console.log('Senha: Quantidade de caracteres ok!');

        // VERIFICANDO SE A SENHA POSSUI ALGUMA LETRA MAIÚSCULA E MINÚSCULA
        const senhaPossuiMinuscula = /[a-z]/.test(campoSenhaPF.value);
        const senhaPossuiMaiuscula = /[A-Z]/.test(campoSenhaPF.value);
        
        if (senhaPossuiMinuscula && senhaPossuiMaiuscula) {
            console.log('Senha: Possui letras minúsculas e maiúsculas ok!');

            // VERIFICANDO SE A SENHA POSSUI ALGUM NÚMERO
            const senhaPossuiNumero = /[0-9]/.test(campoSenhaPF.value);

            if (senhaPossuiNumero) {
                console.log('Senha: Possui números ok!');

                // VERIFICANDO SE A SENHA É IGUAL AO NOME DE USUÁRIO
                if (campoSenhaPF.value != campoUsuarioPF.value) {
                    console.log('Senha: Validação de parâmetros sendo finalizada!');

                    // FIM DA VERIFICAÇÃO DA SENHA

                } else {
                    event.preventDefault();
                    campoSenhaPF.value = '';
                    campoConfirmSenhaPF.value = '';
                    console.log('ERRO: A senha não pode ser igual ao nome de usuário!');
                    window.alert('ERRO: A senha não pode ser igual ao nome de usuário!');
                }

            } else {
                event.preventDefault();
                campoSenhaPF.value = '';
                campoConfirmSenhaPF.value = '';
                console.log('ERRO: A senha não possui números!');
                window.alert('ERRO: A senha deve possuir pelo menos um número!');
            }

        } else {
            event.preventDefault();
            campoSenhaPF.value = '';
            campoConfirmSenhaPF.value = '';
            console.log('ERRO: A senha deve possuir pelo menos uma letra minúscula e maiúscula!');
            window.alert('ERRO: A senha deve possuir pelo menos uma letra minúscula e maiúscula!');
        }

    } else {
        event.preventDefault();
        campoSenhaPF.value = '';
        campoConfirmSenhaPF.value = '';
        console.log('ERRO: Quantidade de caracteres da senha inválida!');
        window.alert('ERRO: A senha deve possuir de 10 a 20 caracteres!');
    }

    // VERIFICANDO SE O CAMPO CONFIRMAÇÃO DE SENHA CORRESPONDE A PRIMEIRA SENHA CADASTRADA
    if (campoConfirmSenhaPF.value == campoSenhaPF.value) {
        console.log('Confirmação de senha: Validada com sucesso!');

    } else {
        event.preventDefault();
        campoConfirmSenhaPF.value = '';
        console.log('ERRO: Confirmação de senha inválida!');
        window.alert('ERRO: Confirmação de senha inválida!');
    }
});

// FUNÇÃO PARA LIMPAR DADOS DO FORMULÁRIO PF
function limparFormPF() {
    cpf.value = '';
    nomeCompleto.value = '';
    telefone.value = '';
    local.value = '';
    email.value = '';
    campoUsuarioPF.value = '';
    campoSenhaPF.value = '';
    campoConfirmSenhaPF.value = '';

    forcaDaSenha = 'FRACA';
    barraForcaDaSenha.style.width = '3%';
    barraForcaDaSenha.style.backgroundColor = 'rgba(255, 0, 0, 0.877)';
    nivelDaSenhaReal.style.color = 'red';
    nivelDaSenhaReal.innerHTML = forcaDaSenha;

    campoForcaDaSenha.style.display = 'none';
    campoNivelDaSenha.style.display = 'none';
}

//////////////////////////////////////////////////////////////////////

/*SCRIPT PARA VALIDAÇÃO DE CADASTRO PESSOA JURÍDICA*/

//////////////////////////////////////////////////////////////////////