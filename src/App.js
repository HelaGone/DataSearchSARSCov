import React, {Fragment, Component} from 'react';
import './App.css';
import InformationBox from './components/InformationBox';
import ErrorBox from './components/ErrorBox';
import Autocomplete from './components/Autocomplete';
import EstatusBox from './components/EstatusBox';
import MapBox from './components/MapBox';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import logo from './logoCovSrch.svg';

const firebaseConfig = {
  apiKey: "AIzaSyDihzAZdliuoZIQF6O7fHzqlwn3hi2QaH8",
  authDomain: "semaforo-covid.firebaseapp.com",
  databaseURL: "https://semaforo-covid.firebaseio.com",
  projectId: "semaforo-covid",
  storageBucket: "semaforo-covid.appspot.com",
  messagingSenderId: "668191319379",
  appId: "1:668191319379:web:c2802d94676fcdead52da6"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const fir_dataCovid_ref = db.collection('datosCovid');

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      allStateData: {},
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
      handleClickSuggestion: this.handleClickSuggestion,
    };
  };

  componentDidMount(){
      this.getDataForMap();
      let params = this.handleGetParams(window.location.href);
      let {estado} = params;
      if(estado !== undefined && estado !== '' && typeof estado == 'string'){
        this.getDataFromApi(estado);
      }
  }

  getDataForMap = () => {
    fir_dataCovid_ref.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //Getting and returning data from firebase
          let fir_data = doc.data();
          this.setState({allStateData: fir_data.estatal})
        });

      }).catch(err => console.error("ERR: ", err));
  }

  getDataFromApi = (query_edo = '', query_muni = '') => {

    if( 'string' !== typeof query_edo || 'string' !== typeof query_muni){
      return;
    }

    let sQuery_edo = this.sanitizeUserInput(query_edo);
    let sQuery_muni = this.sanitizeUserInput(query_muni);
    let apiurl = "https://noticieros.televisa.com/sarscov/"; //PROD;
    // let apiurl = "http://localhost/sarscov/"; //DEV
    if(sQuery_edo !== '' && sQuery_muni !== ''){
      apiurl += `?estado=${sQuery_edo}&municipio=${sQuery_muni}`;
    }else if(sQuery_edo !== '' && sQuery_muni === ''){
      apiurl += `?estado=${sQuery_edo}`;
    }

    let comparison = "";
    switch(sQuery_edo){
      case "aguascalientes":
        comparison = "MX-AGU";
      break;
      case "baja california":
        comparison = "MX-BCN";
      break;
      case "baja california sur":
        comparison = "MX-BCS";
      break;
      case "campeche":
        comparison = "MX-CAM";
      break;
      case "ciudad de mexico":
        comparison = "MX-DIF";
      break;
      case "chiapas":
        comparison = "MX-CHP";
      break;
      case "chihuahua":
        comparison = "MX-CHH";
      break;
      case "coahuila":
        comparison = "MX-COA";
      break;
      case "colima":
        comparison = "MX-COL";
      break;
      case "durango":
        comparison = "MX-DUR";
      break;
      case "estado de mexico":
        comparison = "MX-MEX";
      break;
      case "guanajuato":
        comparison = "MX-GUA";
      break;
      case "guerrero":
        comparison = "MX-GRO";
      break;
      case "hidalgo":
        comparison = "MX-HID";
      break;
      case "jalisco":
        comparison = "MX-JAL";
      break;
      case "michoacán":
        comparison = "MX-MIC";
      break;
      case "morelos":
        comparison = "MX-MOR";
      break;
      case "nayarit":
        comparison = "MX-NAY";
      break;
      case "nuevo leon":
        comparison = "MX-NEL";
      break;
      case "oaxaca":
        comparison = "MX-OAX";
      break;
      case "puebla":
        comparison = "MX-PUE";
      break;
      case "queretaro":
        comparison = "MX-QUE";
      break;
      case "quintana roo":
        comparison = "MX-ROO";
      break;
      case "san luis potosi":
        comparison = "MX-SLP";
      break;
      case "sinaloa":
        comparison = "MX-SIN";
      break;
      case "sonora":
        comparison = "MX-SON";
      break;
      case "tabasco":
        comparison = "MX-TAB";
      break;
      case "tamaulipas":
        comparison = "MX-TAM";
      break;
      case "tlaxcala":
        comparison = "MX-TLA";
      break;
      case "veracruz":
        comparison = "MX-VER";
      break;
      case "yucatan":
        comparison = "MX-YUC";
      break;
      case "zacatecas":
        comparison = "MX-ZAC";
      break;
      default: comparison = "DIF";
    }

    fetch(encodeURI(apiurl))
      .then(data => data.json())
      .then(json => {
        let keysArr = Object.keys(json.datos);

        fir_dataCovid_ref.get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              //Getting and returning data from firebase
              let fir_data = doc.data();
              let obj = fir_data.estatal;

              for(const key of Object.keys(obj) ){
                let edoClav = Object.keys(obj[key]);
                let edobj = Object.values( obj[key]);
                let edoStat = edobj[0].estatus;

                if(edoClav[0] === comparison){
                  //Asigna un nuevo campo "estatus" al objeto json y le asigna
                  // el valor de la gSheet
                  if(keysArr.indexOf("estado")){
                    json.datos.cov_status = parseInt(edoStat, 10);
                  }

                }
              }


              if(keysArr.indexOf("municipio")){
                this.setState({dataEstado: json, muniSuggest: json.datos.municipios, showInputMuni: true});
              }else{
                this.setState({dataMunicipio: json});
              }
              //Scroll to Result
              document.getElementById('estatus_box').scrollIntoView({behavior:'smooth'});

            });

          }).catch(err => console.error("ERR: ", err));

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

    // this.setState({
    //   estado: value
    // });

    this.setState({
      allStateData: {},
      dataEstado:"",
      dataMunicipio: "",
      estado:value,
      showInputMuni: false,
      errorState: false,
      muniSuggest: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: '',
      onChangeAuto: this.handleOnChangeAuto,
      handleClickSuggestion: this.handleClickSuggestion
    })
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

  handleGetParams = (url) => {
    let paramsObj = {};
    let parser = document.createElement('a');
    parser.href = url;
    let query = parser.search.substring(1);
    let vars = query.split('&');
    for(let i = 0; i<vars.length; i++){
      let pair = vars[i].split('=');
      paramsObj[pair[0]] = decodeURIComponent(pair[1]);
    }
    this.setState({estado: paramsObj.estado})
    return paramsObj;
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
      estado,
      allStateData,
      params
    } = this.state;

    let renderEstado = (dataEstado !== '') ? true : false;
    let renderMunicipio = (dataMunicipio !== '') ? true : false;

    return (
      <Fragment>
        <section className="main_section_wrapper">

          <div className="logo_container">
            <a href="https://noticieros.televisa.com" title="Regresar a Noticieros Televisa">
              <img src={logo} alt="Logo Buscador Coronavirus" />
            </a>
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
                <option value="quintana-roo">Quintana Roo</option>
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

          <section id="estatus_box" className="status_alert inner_wrapper">
            <EstatusBox estatus={dataEstado} localidad={estado}/>
          </section>

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

          <MapBox edoEstatus={allStateData} />

          <div className="inner_wrapper footer_source">Fuente: Secretaría de Salud</div>

          <div className="btn_returnNT">
            <a href="https://noticieros.televisa.com" title="Regresar a Noticieros Televisa">Ir a NOTICIEROS TELEVISA</a>
          </div>
        </section>
      </Fragment>
    );
  }
}
