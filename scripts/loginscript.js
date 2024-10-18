// VARIÁVEIS
const formLogin = document.getElementById('iformLogin');
const campoUsuario = document.getElementById('iuser');
const campoSenha = document.getElementById('ipassword');

// FUNÇÃO TESTE PARA LEMBRAR USUÁRIO E SENHA
function forgotPassword() {
    window.alert('Usuário e senha = master');
}

// FUNÇÃO TESTE PARA ACESSO COM USUÁRIO MASTER
function testeAcesso() {
    formLogin.addEventListener('submit', function(event) {
        if (campoUsuario.value == 'master' && campoSenha.value == 'master') {
            event.preventDefault();
            window.location.href = '../pages/home.html';
        }
    });
}