import React, { Component } from 'react';
import hardtack from 'hardtack';
import Pokemon from './pokemon';
import api from '../utils/api';

class Page extends Component {
  state = {
    isLoading: false,
    searchString: '',
    pokemons: [],
    error: null,
  };

  componentDidMount() {
    const searchString = hardtack.get('searchString') || '';

    this.setState({
      isLoading: true,
      searchString,
    });

    api
      .getPokemons()
      .then((pokemons) => {
        this.setState({
          pokemons,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });

  }

  handleSearchChange = (event) => {
    const value = event.currentTarget.value.toLowerCase().trim();

    hardtack.set('searchString', value, {
      maxAge: '31536000',
    });

    this.setState({
      searchString: value,
    });
  };

  renderPokemonsList() {
    const { pokemons, searchString } = this.state;

    const pokemonsList = [];

    pokemons.forEach((pokemon) => {
      if (!pokemon.name.toLowerCase().includes(searchString)) {
        return;
      }

      pokemonsList.push(
        <li className="pokemons__item" key={pokemon.id}>
          <Pokemon pokemon={pokemon} />
        </li>
      );
    });

    return <ul className="pokemons">{pokemonsList}</ul>;
  }

  render() {
    const { isLoading, searchString, error } = this.state;

    return (
      <div className="page">
        {error && <div className="page__error">{error}</div>}
        <div className="page__search">
          <input
            type="text"
            onChange={this.handleSearchChange}
            value={searchString}
            placeholder="Search..."
            autoFocus
          />

        </div>
        {isLoading ? <p>Loading...</p> : this.renderPokemonsList()}
      </div>
    );
  }
}

export default Page;
