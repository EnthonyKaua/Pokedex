const pokeAPI = {};

const url = `https://pokeapi.co/api/v2/pokemon`; //url padrão
//Posicão inicial  | offset = 0;
//Quantidade total | limit = 10;

//Criação e adição da função que busca pokemons na API ao objeto pokeAPI
pokeAPI.buscarPokemons = async (offset = 0, limit = 30) => {

    try{

        const requisicao = await fetch(url + `?offset=${offset}` + `&limit=${limit}`);
        const dataJson = await requisicao.json();

        return dataJson.results; //.results = resultado da LISTA de pokemons encontrados

    }
    
    catch(error){
        
        console.error(error);

    }

};

//Função que cria um modelo de detalhes próprio p/ os pokemons
function criarModeloProprio(pokemoComDetalhesAPI){  

    const pokemon = new Pokemon();

    pokemon.numero = pokemoComDetalhesAPI.id;
    pokemon.nome = pokemoComDetalhesAPI.name;

    const tipos = pokemoComDetalhesAPI.types.map((tipo) => {return tipo.type.name}); //Colocando os valores em lista usando o map()
    const [tipoPrincipal] = tipos; //Array destructuring

    pokemon.tipos = tipos;
    pokemon.tipoPrincipal = tipoPrincipal;
    pokemon.imagem = pokemoComDetalhesAPI.sprites.other.dream_world.front_default;
    pokemon.especie = pokemoComDetalhesAPI.species.name;
    pokemon.altura = pokemoComDetalhesAPI.height;
    pokemon.peso = pokemoComDetalhesAPI.weight;

    const habilidades = pokemoComDetalhesAPI.abilities.map((habilidade) => {return habilidade.ability.name});

    pokemon.habilidades = habilidades;

    return pokemon;

};

//Buscar um único pokemon pela url
pokeAPI.buscarPokemon = async (url) => {

    try{

        const requisicao = await fetch(url);
        const dataJson = await requisicao.json();

        let pokemon = criarModeloProprio(dataJson); //Usando o modelo próprio, retorna os dados do pokemon via url

        return pokemon;
        
    } catch(error){
        
        console.error(error);

    }

};

//Buscar os detalhes do pokemon pelo nome
pokeAPI.buscarDetalhesPokemon = async (nomePokemon) =>{

    try{

        const requisicao = await fetch(url + `/${nomePokemon}`);
        const dataJson = await requisicao.json();

        let pokemon = criarModeloProprio(dataJson); //Usando o modelo próprio, retorna os dados do pokemon via url

        return pokemon;
        
    } catch(error){
        
        console.error(error);

    }

};