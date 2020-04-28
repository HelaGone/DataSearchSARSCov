import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

export default class Autocomplete extends Component{
  static propTypes = {}

  render(){

    let {suggestions, showSuggestions, onChangeAuto, userInput, filteredSuggestions} = this.props;
    // console.log("AC: ", showSuggestions);
    // console.log("AC: ", onChangeAuto);

    let suggestionsListComponent;
    if(showSuggestions && userInput){

      if(filteredSuggestions.length){
        // console.log(filteredSuggestions);
        suggestionsListComponent = (
          <ul>
            {
              filteredSuggestions.map((suggestion,index) => {
                console.log(Object.values(suggestion));
                return(
                  <li key={index} onClick="">{Object.values(suggestion)}</li>
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
        <input name="municipio" type="text" value={userInput} onChange={ onChangeAuto } placeholder="Municipio del estado" />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}
