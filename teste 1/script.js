let  modal = document.querySelector('.box')
let  tbody = document.querySelector('tbody')
let  sNome = document.querySelector('#n-nome')
let  sCategoria = document.querySelector('#n-categoria')
let  sDescricao = document.querySelector('#n-descricao')
let  sPreco = document.querySelector('#n-preco')
let  sQuantidade = document.querySelector('#n-quantidade')
let  btn = document.querySelector('#btn')
 
let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('box') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sCategoria.value = itens[index].categoria
    sDescricao.value = itens[index].descricao
    sPreco.value = itens[index].preco
    sQuantidade.value = itens[index].quantidade
    id = index
  } else {
    sNome.value = ''
    sCategoria.value = ''
    sDescricao.value = ''
    sPreco.value = ''
    sQuantidade.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.categoria}</td>
    <td>${item.descricao}</td>
    <td>R$ ${item.preco}</td>
    <td>${item.quantidade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btn.onclick = e => {
  
  if (sNome.value == '' || sCategoria.value == '' || sDescricao.value == '' || sPreco == '' || sQuantidade == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].categoria = sCategoria.value
    itens[id].descricao = sDescricao.value
    itens[id].preco = sPreco.value
    itens[id].quantidade = sQuantidade.value
  } else {
    itens.push({'nome' : sNome.value, 'categoria' : sCategoria.value, 'descricao' : sDescricao.value, 'preco' : sPreco, 'quantidade' : sQuantidade})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()