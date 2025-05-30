import React, { Component } from 'react';
import api from '../utils/api';

class Pokemon extends Component {
  state = {
    hasHovered: false,
    details: {},
  };

  renderDetails() {
    const { details } = this.state;
    return (<table>
        <tr>
          <td colSpan="2">
            {details.types.map((dtype)=>{
              const id_type = /type\/(\d+)\//.exec(dtype.type.url)[1];
              return <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vii/sun-moon/${id_type}.png`}/>;
            }) }
          </td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{details.height}</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{details.weight}</td>
        </tr>
        
        {details.stats.map((dstat)=>{
          return <tr>
              <td>{dstat.name}</td>
              <td>{dstat.base_stat}</td>
            </tr>;
        }) }
      </table>);
  }

  render() {
    const { pokemon } = this.props;
    const { details, hasHovered } = this.state;

    return (
      <div className="pokemon">
        <div>
          <button
            type="button"
            className="sprite"
            onMouseEnter={()=>{
              if(hasHovered) return;

              this.setState({
                hasHovered: true,
              });
              api.getPokemonStat(pokemon.id)
                .then((details) => {
                  this.setState({
                    details,
                  });
                })
                .catch((error) => {
                  this.setState({
                    error: error.message,
                  });
                });
            }}
            style={{
              backgroundImage: `url(${`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`})`,
            }}
          />
          <p className="name">{pokemon.name}</p>
        </div>

        <div className='details'>
          {Object.keys(details).length == 0 ? <p>Loading...</p> : this.renderDetails()}
        </div>
      </div>
    );
  }
}

export default Pokemon;
