class API {
  async getPokemonStat(id){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((result) => {
        const items = ['height', 'weight', 'types', 'stats'];
        var out = {};
        items.forEach(element => { out[element] = result[element]; });

        out.stats = out.stats.map((st) => {
          return {
            name :st.stat.name.split(/[ \-]/).map((str)=>{return str.charAt(0).toUpperCase() + str.slice(1);}).join(' '),
            base_stat: st.base_stat,
          };
        }) 
        return out;
      });
  }
  async getPokemons(limit = 784) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
      .then((response) => response.json())
      .then((result) => {
        
        const pokemons = result.results.map((pokemon) => {
          const { url } = pokemon;
          const id = /pokemon\/(\d+)\//.exec(url)[1];
          pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          return {
            ...pokemon,
            id,
          };
        });
        return pokemons;

      });
  }
}

const api = new API();

export default api;
