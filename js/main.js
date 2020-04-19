const input = document.querySelector('.inputflag')
const btn = document.querySelector('.botao')
const list = document.querySelector('.lista')
const dropdown = document.querySelector('.dropdown')
const drpbtn = dropdown.querySelector('.btn')
const darkmode = document.querySelector('.darkmode')
const nav = document.querySelector('.navbar')
const control = document.querySelector('.control')
const body = document.querySelector('body')
const drpitens = document.querySelectorAll('.dropdown-item')
const drpd = document.querySelector('.dropdown-menu')
// const cards = document.querySelectorAll('.card')
let cor = 'light'

darkmode.addEventListener('click', (e)=>{
    if (darkmode.innerHTML == 'Darkmode'){
    darkmode.innerHTML = 'Lightmode'
    cor = 'dark'}
    else{
        darkmode.innerHTML = 'Darkmode'
        cor = 'light'
    }
    setTheme()
    })
  




const setTheme = (color)=>{
    if (cor == 'dark'){ 
        const cards = document.querySelectorAll('.card')
        nav.classList.add('dark-object')
        control.classList.add('dark')
        body.setAttribute('class', 'dark')
        darkmode.classList.add('dark-object')
        drpbtn.classList.add('dark-object')
        btn.classList.add('dark-object')
        input.classList.add('dark-object')
        drpd.classList.add('dark-object')
        for (card of cards){
            card.classList.add('dark-object')
        }
        for (itens of drpitens){
            itens.classList.add('dark-object')
        }
    }
    else{
        const cards = document.querySelectorAll('.card')
        nav.classList.remove('dark-object')
        control.classList.remove('dark')
        body.classList.remove('dark')
        darkmode.classList.remove('dark-object')
        drpbtn.classList.remove('dark-object')
        btn.classList.remove('dark-object')
        input.classList.remove('dark-object')
        drpd.classList.remove('dark-object')
        for (card of cards){
            card.classList.remove('dark-object')
        }
        for (itens of drpitens){
            itens.classList.remove('dark-object')
        }
    }
}


const showAll = ()=>{
    input.value= ''
    axios.get('https://restcountries.eu/rest/v2/all')
    .then((response)=>{
        render(response.data)
    })
    .catch((error)=>{
        list.innerHTML = ""
    const erro =document.createElement('p')
    erro.innerHTML = "404 not found"
    list.appendChild(erro)
    })
}
showAll()


dropdown.addEventListener('click', (e)=>{
    e.preventDefault()
    setTheme()
    const itens = dropdown.querySelectorAll('a')
    const btn = dropdown.querySelector('.btn')
    const item = e.target
    const cont = item.innerHTML
    if (item.classList.contains('dropdown-item')){
        for (i of itens){
            i.classList.remove('active')
        }
        
        item.classList.add('active')
        btn.innerHTML = `Region: ${cont}`
        if(cont === 'All'){
            showAll()
        }
        else{
        showCont(cont)}
    }

})

const showCont = (cont) =>{
    axios.get('https://restcountries.eu/rest/v2/region/'+cont)
    .then((response)=>{
        render(response.data)
    })
    .catch((error)=>{
        
    })
}


btn.addEventListener('click', (e)=>{
    const btn = dropdown.querySelector('.btn')
    btn.innerHTML= "Region: All"
    const name = input.value;
    procurar(name);
    setTheme()
})

const teste = ()=>{
    console.log('XDXD')}

input.addEventListener('keypress', (e)=>{
    const btn = dropdown.querySelector('.btn')
    btn.innerHTML= "Region: All"
    const name = input.value;
    if (!name) showAll()
    if (e.keyCode == 13){
    procurar(name);
    
}
   
})


const procurar = (name)=>{

axios.get('https://restcountries.eu/rest/v2/name/'+name)
.then((response)=>{
    render(response.data)
})
.catch((error)=>{
    list.innerHTML = ""
    // const erro =document.createElement('li')
    // erro.innerHTML = "404 not found"
    // list.appendChild(erro)
})
}

const render = (data)=>{
    list.innerHTML = ''
    
    for (i of data){
        // const {name, region, flag} = i
        // const bandeira = document.createElement('img')
        // bandeira.setAttribute('src', flag)
        // bandeira.setAttribute('class', 'flag')
        // const nomePais = document.createElement('p')
        // nomePais.innerHTML = name
        // const regiao = document.createElement('p')
        // regiao.innerHTML = region
        // const item = document.createElement('li')
        // item.appendChild(bandeira)
        // item.appendChild(nomePais)
        // item.appendChild(regiao)
        // list.appendChild(item)

        const {name, region, flag, capital, population } = i
        const bandeira = document.createElement('img')
        bandeira.setAttribute('src', flag)
        bandeira.setAttribute('class', 'flag card-img-top')
        const nomePais = document.createElement('p')
        nomePais.innerHTML = name
        nomePais.setAttribute('class','card-text name')
        const regiao = document.createElement('p')
        regiao.innerHTML = '<span class="spanbold">Region: </span>' +region
        regiao.setAttribute('class','card-text')
        const populacao = document.createElement('p')
        populacao.innerHTML = '<span class="spanbold">Population: </span>' +population.toLocaleString('pt-BR')
        populacao.setAttribute('class','card-text')
        const capital2 = document.createElement('p')
        capital2.innerHTML = '<span class="spanbold">Capital: </span>' +capital
        capital2.setAttribute('class','card-text')


        const divcard = document.createElement('div')
        divcard.setAttribute('class', 'col-sm-3 divcard')
        const item = document.createElement('div')
        item.setAttribute('class','card')
        item.appendChild(bandeira)       
        const body = document.createElement('div')
        body.setAttribute('class','card-body')
        body.appendChild(nomePais)
        body.appendChild(populacao)
        body.appendChild(regiao)
        body.appendChild(capital2)
        item.appendChild(body)
        divcard.appendChild(item)
        list.appendChild(divcard)
    }
    setTheme()
}

