firebase.auth().languageCode = 'pt-BR'
//FUNÇÃO QUE TRATA A SUBMISSÃO DO FORMULÁRIO DE AUTENTICAÇÃO

FrmAutentica.onsubmit = function (event) {
    MostraItem(Carregando)
    event.preventDefault() //evita o redirecionamento
    //CASO ESTEJA ACESSANDO COM UM USUÁRIO E SENHA JÁ EXISTENTE
    if (FrmAutentica.FrmAutenticaSubmit.innerHTML == 'Acessar') {
        firebase.auth().signInWithEmailAndPassword(FrmAutentica.email.value, FrmAutentica.senha.value).then(function (user) {
            alert('Acesso realizado com sucesso.');
            console.log(user)
        }).catch(function (error) {
            alert('Falha no Acesso.')
            console.log(error)
            OcultaItem(Carregando)
        })
    } else {
        //CASO ESTEJA EXECUTANDO UM CADASTRO NOVO
        firebase.auth().createUserWithEmailAndPassword(FrmAutentica.email.value, FrmAutentica.senha.value).then(function (user) {
            alert('Usuário cadastrado com sucesso. ')
        }).catch(function (error) {
            alert('Falha ao cadastrar o novo usuário. ')
            console.log(error)
            OcultaItem(Carregando)
        })
    }
}

//FUNÇÃO QUE CENTRALIZA E TRATA A AUTENTIFICAÇÃO
firebase.auth().onAuthStateChanged(function (user) {
    OcultaItem(Carregando)
    if (user) {
        MostraItem(Log);
        OcultaItem(app);

        UsuarioLogadoTitulo.innerHTML = 'Usuário autenticado: ' + user.email;
        ImgUsuario.src = user.photoURL ? user.photoURL : 'IMGs/usuarioIMG.png'
        if (user.emailVerified) {
            OcultaItem(EnviaVerificaEmail)
            VerificaEmail.innerHTML = 'E-mail Verificado'
        } else {
            MostraItem(EnviaVerificaEmail)
            VerificaEmail.innerHTML = 'E-mail não Verificado'
        }

        listaCidade()
    } else {
        MostraItem(app)
        OcultaItem(Log);
    }
});

//FUNÇÃO PARA EVENTUAR O LOGOUT DO USUÁRIO
function signOut() {
    firebase.auth().signOut().then(function () {
        alert('Usuário saiu');
    }).catch(function (error) {
        console.log('Falha ao sair da conta: ');
        console.log(error);
    })

    FrmAutentica.email.value = '';
    FrmAutentica.senha.value = '';
}

function verificaEmail() {
    user = firebase.auth().currentUser;
    user.sendEmailVerification(atualizarUrl).then(function () {
        alert('E-mail de verificação foi enviado para ' + user.email + 'Verifique a sua caixa de entrada. ')
    }).catch(function (error) {
        alert('Erro ao enviar e-mail de verificação')
    })
}

function excluirUsuario() {
    var confirma = confirm('Confirmar a exclusão da sua conta?')
    if (confirma) {
        //MostraItem(Carregando)
        firebase.auth().currentUser.delete().then(function () {
            alert('Conta excluída com sucesso. ')
        }).catch(function (error) {
            alert('Erro ao excluir a conta do usuário')
            console.log(error)
        }).finally(function () {
            //OcultaItem(Carregando)
        })

        FrmAutentica.email.value = '';
        FrmAutentica.senha.value = '';
    }
}


function LoginGoogle() {
    MostraItem(Carregando)
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error) {
        alert("Erro de autentificação com o servidor da Google");
        console.log(error)
        OcultaItem(Carregando)
    })
}