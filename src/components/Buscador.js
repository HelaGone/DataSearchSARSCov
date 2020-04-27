import React, {Fragment, Component} from 'react';

export default class Buscador extends Component{
  constructor(props){
    super(props);
    this.state = {value: ''}
  }

  render(){
    return(
      <Fragment>
        Hola Buscador
      </Fragment>
    );
  }
}
