import React, {Fragment, Component} from 'react';
import './App.css';
import InformationBox from './components/InformationBox';
import ErrorBox from './components/ErrorBox';
import Autocomplete from './components/Autocomplete';
import logo from './logoCovSrch.svg';
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
    const value = target.value;

    this.setState({
      estado: value
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
      showSuggestions,
      showInputMuni,
      onChangeAuto,
      userInput,
      filteredSuggestions,
      handleClickSuggestion,
      estado
    } = this.state;

    let renderEstado = (dataEstado !== '') ? true : false;
    let renderMunicipio = (dataMunicipio !== '') ? true : false;

    console.log(estado);

    return (
      <Fragment>
        <section className="main_section_wrapper">

          <div className="logo_container">
            <img src={logo} alt="Logo Buscador Coronavirus" />
          </div>

          <div className="inner_wrapper">
            <form onSubmit={this.handleSubmit}>
              <select value={estado} onChange={this.handleOnChange}>
                <option default>Selecciona tu estado</option>
                <option value="aguascalientes">Aguascalientes</option>
                <option value="baja california">Baja California</option>
                <option value="baja california sur">Baja California Sur</option>
                <option value="campeche">Campeche</option>
                <option value="ciudad de mexico">Ciudad de México</option>
                <option value="chiapas">Chiapas</option>
                <option value="chihuahua">Chihuahua</option>
                <option value="coahuila">Coahuila</option>
                <option value="colima">Colima</option>
                <option value="durango">Durango</option>
                <option value="estado de mexico">Estado de México</option>
                <option value="guanajuato">Guanajuato</option>
                <option value="guerrero">Guerrero</option>
                <option value="hidalgo">Hidalgo</option>
                <option value="jalisco">Jalisco</option>
                <option value="michoacán">Michoacán</option>
                <option value="morelos">Morelos</option>
                <option value="nayarit">Nayarit</option>
                <option value="nuevo leon">Nuevo León</option>
                <option value="oaxaca">Oaxaca</option>
                <option value="puebla">Puebla</option>
                <option value="queretaro">Querétaro</option>
                <option value="san luis potosi">San Luis Potosí</option>
                <option value="sinaloa">Sinaloa</option>
                <option value="sonora">Sonora</option>
                <option value="tabasco">Tabasco</option>
                <option value="tamaulipas">Tamaulipas</option>
                <option value="tlaxcala">Tlaxcala</option>
                <option value="veracruz">Veracruz</option>
                <option value="yucatan">Yucatán</option>
                <option value="zacatecas">Zacatecas</option>
              </select>

              {
                showInputMuni && (
                  <Autocomplete
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
              renderMunicipio && (
                <InformationBox data={dataMunicipio} localidad={this.state.userInput}/>
              )
            }

            {
              renderEstado && (
                <InformationBox data={dataEstado} localidad={this.state.estado}/>
              )
            }

          </section>
          <div className="inner_wrapper footer_source">Fuente: Secretaría de Salud</div>
        </section>
      </Fragment>
    );
  }
}
