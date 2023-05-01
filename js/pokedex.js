const listaPokemons = document.querySelector(".listaPokemons");
const botaoCarregarMais = document.querySelector("#carregarMais");
const main = document.querySelector(".main");
let detalhesPokemonSection = null;

let habilidades = "";

let offset = 0;
let limit = 12;
const limiteMax = 150;

botaoCarregarMais.addEventListener("click", () => {

    offset += limit;

    if(offset === 0){
    
        limit = 8;
    
    };

    //Limitar à primeira geração de pokemons(até 150)
    const ultimoPokemonDaVez = offset + limit;

    if(ultimoPokemonDaVez >= limiteMax){

        montarListaPokemons(offset, (limiteMax-offset));
        botaoCarregarMais.parentNode.removeChild(botaoCarregarMais);

    }

    else{

        montarListaPokemons(offset, limit);

    };

});

//Função que monta a lista de pokemons
async function montarListaPokemons(offset, limit){

    //Função p/ add os elementos diretamente com uma string que será add ao innerHTML da Lista de Pokemons(html)
    function comandoHTMLCriador(pokemon){return `
    
        <li class="pokemon ${pokemon.tipoPrincipal}" onclick="puxarDetalhesPokemon('${pokemon.nome}')">

        <span class="numero">#${(pokemon.numero<10?"00":"0")}${pokemon.numero}</span>     
        <span class="nome">${pokemon.nome}</span>

        <div class="detalhes">

            <ol class="tipos">

                ${pokemon.tipos.map((tipo) => {return `<li class="tipo ${tipo}">${tipo}</li>`}).join("")}

            </ol>

            <img src="${pokemon.imagem}" alt="${(pokemon.nome)}">

        </div>

    `};

    const pokemonsNaLista = await pokeAPI.buscarPokemons(offset, limit); //Lista com todos os pokemons buscados

    //Separação dos pokemons buscados que estão dentro da lista e adição deles ao html
    for(let i = 0; i < pokemonsNaLista.length; i++){
        
        const pokemon = await pokeAPI.buscarPokemon(pokemonsNaLista[i].url); //Pokemon retorna com seus detalhes (modelo próprio)

        listaPokemons.innerHTML += comandoHTMLCriador(pokemon); //Pokemon add ao html
        
    };
    
};

async function puxarDetalhesPokemon(nomePokemon){

    if(detalhesPokemonSection!=null){

        detalhesPokemonSection.parentNode.removeChild(detalhesPokemonSection);

    };

    function comandoDetalhesHTML(pokemon){return `
    
    <div class="cardDetalhesPokemon ${pokemon.tipoPrincipal}">

        <button class="setaVoltar">&larr;</button>

        <h1 class="nomePokemon">${pokemon.nome}</h1>

        <div class="numero">#${(pokemon.numero<10?"00":"0")}${pokemon.numero}</div>

        <ul class="tipos">

            ${pokemon.tipos.map((tipo) => {return `<li class="tipo ${tipo}">${tipo}</li>`}).join("")}

        </ul>

        <div class="centralizar">

            <img src="${pokemon.imagem}" alt="${(pokemon.nome)}">

        </div>

        <div class="detalhes">

            <p>Espécie</p>

            <p class="r">${pokemon.especie}</p>

            <p>Altura</p>

            <p class="r">${pokemon.altura}</p>
     
            <p>Peso</p>

            <p class="r">${pokemon.peso}</p>

            <p>Habilidades</p>

            <div class="habilidades">

                ${habilidades = ""}
                ${pokemon.habilidades.map((habilidade, i) => {i == habilidades.length?habilidades += habilidade + ", ":habilidades += habilidade}).join("")}

                <p class="r">${habilidades}</li>

            </div>

        </div>

    </div>
    
    `};

    const pokemonComDetalhes = await pokeAPI.buscarDetalhesPokemon(nomePokemon);
    
    //Cria um novo elemento HTML(section) para os detalhes do Pokémon e add a class
    detalhesPokemonSection = document.createElement("section");
    detalhesPokemonSection.classList.add("detalhesPokemonSection");

    detalhesPokemonSection.innerHTML = comandoDetalhesHTML(pokemonComDetalhes); //Adiciona o pokemon com detalhe dentro da section "detalhesPokemonSection"
    
    //Tempo entre a exclusão e a aprição da section
    setTimeout(() =>{

        main.appendChild(detalhesPokemonSection); //Adiciona a section "detalhesPokemonSection" à página dentro da variável "main"

    }, 250);

    //Tempo para pegar o elemento seta e add o evento
    setTimeout(() =>{

        const setaVoltar = document.querySelector(".setaVoltar");

        setaVoltar.addEventListener("click", () => {

            detalhesPokemonSection.parentNode.removeChild(detalhesPokemonSection);
            detalhesPokemonSection = null;
    
        });

    }, 500);

};

montarListaPokemons(offset, limit);
