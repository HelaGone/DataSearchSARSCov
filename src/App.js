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
      municipio:"",
      showInputMuni: false,
      errorState: false,
      muniSuggest: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      onChangeAuto: this.handleOnChangeAuto
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
          estado: "",
          municipio: ""
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
    this.getDataFromApi(this.state.estado, this.state.municipio);
    event.preventDefault();
  }

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.name === 'estado' ? target.value : target.value;
    const fieldName = target.name;

    // if(target.name === 'estado' && target.value !== ''){
    //   if(target.value.length > 5){
    //     this.setState({
    //       showInputMuni: true
    //     });
    //   }
    // }

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

  handleClearForm = () => {
    this.setState({
      dataEstado: "",
      dataMunicipio: "",
      estado: "",
      municipio: "",
      showInputMuni: false,
      errorState: false
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
      methods
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
                    filteredSuggestions={filteredSuggestions}
                    userInput={userInput}
                    />
                )
              }


                {/*<Autocomplete
                  showSuggestions=""
                  userInput=""
                  filteredSuggestions=""
                  suggestions={this.state.muniSuggest}
                  methods={onChangeAuto}
                  showInputMuni={showInputMuni} />*/}

              <div className="button_container">
                <input className="btn_search" type="submit" value="Buscar"></input>
                <input className="btn_clean" type="button" value="Limpiar" onClick={this.handleClearForm}></input>
              </div>
            </form>
          </div>

          <ul>
            {
              /*muniSuggest.map((elem, i) => {
                return(
                    <li key={i} >{Object.values(elem)[0]}</li>
                )
              })*/
            }
          </ul>

          <section className="results_section flex_wrapper">
            { this.state.errorState && <ErrorBox />}

            {
              renderEstado && (
                <InformationBox data={dataEstado} localidad={this.state.estado}/>
              )
            }

            {
              renderMunicipio && (
                <InformationBox data={dataMunicipio} localidad={this.state.municipio}/>
              )
            }

          </section>

        </section>
      </Fragment>
    );
  }
}
