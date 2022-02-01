firebase.auth().languageCode = 'pt-BR'

FrmProduto.onsubmit = function (event) {
    event.preventDefault()

    if (FrmProduto.prod_nome.value == '') {
        alert('O nome do produto não pode ser em branco')
        FrmProduto.prod_nome.focus();
    } else if (FrmProduto.prod_qtd.value == '') {
        alert('A quantidade do produto não pode ficar em branco')
        FrmProduto.prod_qtd.focus();
    } else if (FrmProduto.prod_valor.value == '') {
        alert('O valor do produto não pode ser em nulo')
        FrmProduto.prod_valor.focus();
    } else if (FrmProduto.prod_fornecedor.value == '') {
        alert('O fornecedor do produto não pode ser em branco')
        FrmProduto.prod_fornecedor.focus();
    }
    else {
        firebase.firestore().collection('PRODUTOS').add({
            Nome: FrmProduto.prod_nome.value,
            Quantidade: FrmProduto.prod_qtd.value,
            Valor: FrmProduto.prod_valor.value,
            Fornecedor: FrmProduto.prod_fornecedor.value,

        })
            .then((docRef) => {
                console.log("Produto cadastrado com o ID: ", docRef.id);
                alert('Produto cadastrado com sucesso.')
                FrmProduto.prod_nome.value = ''
                FrmProduto.prod_qtd.value = ''
                FrmProduto.prod_valor.value = ''
                FrmProduto.prod_fornecedor.value = ''
            })

            .catch((error) => {
                console.error("Erro ao adicionar documento: ", error);
                alert('Erro ao cadastrar o produto')

            });
    }
}

function listaProduto() {
    firebase.firestore().collection('PRODUTOS')
        .orderBy('Nome').onSnapshot(function (dataSnapshot1) {
            geralistaProduto(dataSnapshot1)
        })
}

function geralistaProduto(dataSnapshot1) {
    ulListaProdutos.innerHTML = ''
    var num1 = dataSnapshot1.size


    totalProdutos.innerHTML = 'Total de registros: ' + num1 + (num1 > 1 ? ' produtos' : ' produto') + '.'
    dataSnapshot1.forEach(function (item) {
        var value1 = item.data()

        var li1 = document.createElement('li')

        li1.id = item.id

        var spanLi1 = document.createElement('span')
        spanLi1.appendChild(document.createTextNode(value1.Nome + ' / ' + value1.Quantidade))
        li1.appendChild(spanLi1)

        var li1UpdateBtn = document.createElement('button')
        li1UpdateBtn.appendChild(document.createTextNode('Alterar'))

        li1UpdateBtn.setAttribute('class', 'CorBotaoAlterar')
        li1.appendChild(li1UpdateBtn)

        var li1RemoveBtn = document.createElement('button')
        li1RemoveBtn.appendChild(document.createTextNode('Excluir'))

        li1RemoveBtn.setAttribute('class', 'CorBotaoDeletarExcluir')
        li1.appendChild(li1RemoveBtn)

        ulListaProdutos.appendChild(li1)
    })
}