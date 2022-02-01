firebase.auth().languageCode = 'pt-BR'

FrmCliente.onsubmit = function (event) {
    event.preventDefault()

    if (FrmCliente.cli_nome.value == '') {
        alert('O nome do cliente não pode ser em branco')
        FrmCliente.cli_nome.focus();
    } else if (FrmCliente.cli_endereco.value == '') {
        alert('O endereco do cliente não pode ser em branco')
        FrmCliente.cli_endereco.focus();
    } else if (FrmCliente.cli_cpf.value == '') {
        alert('O cpf do cliente não pode ser em branco')
        FrmCliente.cli_cpf.focus();
    } else if (FrmCliente.cli_fone.value == '') {
        alert('O telefone do cliente não pode ser em branco')
        FrmCliente.cli_fone.focus();
    }
    else {
        firebase.firestore().collection('CLIENTES').add({
            Nome: FrmCliente.cli_nome.value,
            Endereco: FrmCliente.cli_endereco.value,
            Cpf: FrmCliente.cli_cpf.value,
            Fone: FrmCliente.cli_fone.value,

        })
            .then((docRef) => {
                console.log("Cliente cadastrado com o ID: ", docRef.id);
                alert('Cliente cadastrado com sucesso.')
                FrmCliente.cli_nome.value = ''
                FrmCliente.cli_endereco.value = ''
                FrmCliente.cli_cpf.value = ''
                FrmCliente.cli_fone.value = ''
            })

            .catch((error) => {
                console.error("Erro ao adicionar documento: ", error);
                alert('Erro ao cadastrar o cliente')

            });
    }
}

function listaCliente() {
    firebase.firestore().collection('CLIENTES')
        .orderBy('Nome').onSnapshot(function (dataSnapshot) {
            geralistaCliente(dataSnapshot)
        })
}

function geralistaCliente(dataSnapshot) {
    ulListaClientes.innerHTML = ''
    var num = dataSnapshot.size

    //Exibe o número de cidades
    totalClientes.innerHTML = 'Total de registros: ' + num + (num > 1 ? ' clientes' : ' cliente') + '.' 
    dataSnapshot.forEach(function (item) { //Percorre todos os elementos
        var value = item.data()

        var li = document.createElement('li') // Cria um elemento do tipo li

        li.id = item.id // Define o id do li como a chave da tarefa

        var spanLi = document.createElement('span') // cria um elemento do tipo span
        spanLi.appendChild(document.createTextNode(value.Nome + ' / ' + value.Cpf)) // Adiciona o elemento de texto dentro da nossa span

        li.appendChild(spanLi) // Adiciona o span dentro do li

        //ADICIONA O BOTÃO PARA ALTERAR
        var liUpdateBtn = document.createElement('button')
        liUpdateBtn.appendChild(document.createTextNode('Alterar'))

        liUpdateBtn.setAttribute('class', 'CorBotaoDeletarAlterar')
        li.appendChild(liUpdateBtn)

        //ADICIONA O BOTÃO PARA EXCLUIR
        var liRemoveBtn = document.createElement('button')
        liRemoveBtn.appendChild(document.createTextNode('Excluir'))

        liRemoveBtn.setAttribute('class', 'CorBotaoDeletarExcluir')
        li.appendChild(liRemoveBtn)


        ulListaClientes.appendChild(li) // adiciona o li dentro da lista de tarefas
    })
}

