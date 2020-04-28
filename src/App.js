import React, {Fragment, Component} from 'react';
import './App.css';
import InformationBox from './components/InformationBox';
import ErrorBox from './components/ErrorBox';
import Autocomplete from './components/Autocomplete';
export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataEstado:"",
      dataMunicipio: "",
      estado:"",
      showInputMuni: false,
      errorState: false,
      muniSuggest: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      onChangeAuto: this.handleOnChangeAuto,
      handleClickSuggestion: this.handleClickSuggestion
    };
  };

  getDataFromApi = (query_edo, query_muni) => {
    //TODO: Sanitizar el input del usuario desde cliente
    if( 'string' !== typeof query_edo || 'string' !== typeof query_muni){
      return;
    }

    let apiurl = "https://noticieros.televisa.com/sarscov/"; //PROD;
    // let apiurl = "http://localhost/sarscov/"; //DEV
    if(query_edo !== '' && query_muni !== ''){
      apiurl += `?estado=${this.sanitizeUserInput(query_edo)}&municipio=${this.sanitizeUserInput(query_muni)}`;
    }else if(query_edo !== '' && query_muni === ''){
      apiurl += `?estado=${this.sanitizeUserInput(query_edo)}`;
    }

    fetch(encodeURI(apiurl))
      .then(data => data.json())
      .then(json => {

        let keysArr = Object.keys(json.datos);

        if(keysArr.indexOf("municipio")){
          this.setState({dataEstado: json, muniSuggest: json.datos.municipios, showInputMuni: true});
        }else{
          this.setState({dataMunicipio: json});
        }

        return json;
      }).catch(error => {
        this.setState({
          errorState: true,
          dataEstado: "",
          dataMunicipio: "",
          estado: ""
        });
        // console.error("EL ERROR!: ",error);
        return error;
      });
  }

  sanitizeUserInput = (str) => {
    const map = {
      'a': 'á|à|ä|â|ã|Á|À|Ä|Â|Ã',
      'e': 'é|è|ë|ê|É|È|Ê|Ë',
      'i': 'í|ì|ï|î|Í|Ì|Ï|Î',
      'o': 'ó|ò|ö|ô|õ|Ó|Ò|Ö|Ô|Õ',
      'u': 'ú|ù|ü|û|Ú|Ù|Ü|Û',
      'n': 'ñ|Ñ'
    }

    str = str.toLowerCase();
    for(let pattern in map){
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }

    return str;
  }

  handleSubmit = (event) => {
    this.setState({errorState: false})
    this.getDataFromApi(this.state.estado, this.state.userInput);
    event.preventDefault();
  }

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.name === 'estado' ? target.value : target.value;
    const fieldName = target.name;

    this.setState({
      [fieldName]: value,
    });
  }

  /*
   * Se encarga de capturar el evento del cambio de valor en el input
  */
  handleOnChangeAuto = (event) => {
    const {muniSuggest} = this.state;
    const userInput = event.currentTarget.value;
    const filteredSuggestions = muniSuggest.filter( (sug) => {
        let strval = Object.values(sug)[0];
        return strval.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
    });

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: filteredSuggestions,
      showSuggestions: true,
      userInput: userInput
    });
  }

  handleClickSuggestion = (event) => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: event.currentTarget.innerText
    });
  }

  handleClearForm = () => {
    this.setState({
      dataEstado:"",
      dataMunicipio: "",
      estado:"",
      showInputMuni: false,
      errorState: false,
      muniSuggest: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
    });
  }

  render(){

    let {
      dataEstado,
      dataMunicipio,
      muniSuggest,
      showSuggestions,
      showInputMuni,
      onChangeAuto,
      userInput,
      filteredSuggestions,
      handleClickSuggestion
    } = this.state;

    let renderEstado = (dataEstado !== '') ? true : false;
    let renderMunicipio = (dataMunicipio !== '') ? true : false;

    return (
      <Fragment>
        <section className="main_section_wrapper">

          <h1>BUSCADOR DE ACTIVIDAD COVID POR ESTADO Y MUNICIPIO</h1>

          <div className="inner_wrapper">
            <form onSubmit={this.handleSubmit}>
              <input name="estado" type="text" value={this.state.estado} onChange={this.handleOnChange} placeholder="Estado de la república"/>

              {
                showInputMuni && (
                  <Autocomplete
                    suggestions={this.state.muniSuggest}
                    showSuggestions={showSuggestions}
                    onChangeAuto={onChangeAuto}
                    handleClickSuggestion={handleClickSuggestion}
                    filteredSuggestions={filteredSuggestions}
                    userInput={userInput}
                    />
                )
              }

              <div className="button_container">
                <input className="btn_search" type="submit" value="Buscar"></input>
                <input className="btn_clean" type="button" value="Limpiar" onClick={this.handleClearForm}></input>
              </div>
            </form>
          </div>

          <section className="results_section flex_wrapper">
            { this.state.errorState && <ErrorBox /> }

            {
              renderEstado && (
                <InformationBox data={dataEstado} localidad={this.state.estado}/>
              )
            }

            {
              renderMunicipio && (
                <InformationBox data={dataMunicipio} localidad={this.state.userInput}/>
              )
            }

          </section>

        </section>
      </Fragment>
    );
  }
}
