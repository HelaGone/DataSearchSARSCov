import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

export default class Autocomplete extends Component{
  static propTypes = {}

  render(){

    let {showSuggestions, onChangeAuto, userInput, filteredSuggestions, handleClickSuggestion} = this.props;
    // console.log("AC: ", showSuggestions);
    // console.log("AC: ", onChangeAuto);

    let suggestionsListComponent;
    if(showSuggestions && userInput){

      if(filteredSuggestions.length){
        // console.log(filteredSuggestions);
        suggestionsListComponent = (
          <ul className="suggestion_list">
            {
              filteredSuggestions.map((suggestion,index) => {
                return(
                  <li key={index} onClick={handleClickSuggestion}>{Object.values(suggestion)}</li>
                );
              })
            }
          </ul>
        );
      }else{
        suggestionsListComponent = (
          <div className="no-suggestions"><em>No hay sugerencias</em></div>
        );
      }

    }

    return(
      <Fragment>
        <input name="municipio" type="text" value={userInput} onChange={ onChangeAuto } placeholder="Busca tu municipio" />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}
