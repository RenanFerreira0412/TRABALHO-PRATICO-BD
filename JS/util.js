var FrmAutentica = document.getElementById('FrmAutentica');
var FrmAutenticaTitulo = document.getElementById('FrmAutenticaTitulo');

var Registrar = document.getElementById('Registrar');
var Acessar = document.getElementById('Acessar');

var Logado = document.getElementById('Logado');
var UsuarioLogadoTitulo = document.getElementById('UsuarioLogadoTitulo');

var VerificaEmail = document.getElementById('VerificaEmail');
var EnviaVerificaEmail = document.getElementById('EnviaVerificaEmail');

var Carregando = document.getElementById("Carregando");

var ImgUsuario = document.getElementById("ImgUsuario");

var FrmCidade = document.getElementById('FrmCidade');

function MostraItem(element) {
    element.style.display = 'block';
}

function OcultaItem(element) {
    element.style.display = 'none';
}

function RealizarCadastro() {
    FrmAutentica.FrmAutenticaSubmit.innerHTML = 'Cadastrar uma conta';
    FrmAutenticaTitulo.innerHTML = 'Insira seu dados para se cadastrar';

    OcultaItem(Registrar);
    MostraItem(Acessar);
}

function RealizarAcesso() {
    FrmAutentica.FrmAutenticaSubmit.innerHTML = 'Acessar';
    FrmAutenticaTitulo.innerHTML = 'Acesse a sua conta para continuar';

    OcultaItem(Acessar);
    MostraItem(Registrar);
}

var atualizarUrl = {
    url: 'http://127.0.0.1:5500'
}