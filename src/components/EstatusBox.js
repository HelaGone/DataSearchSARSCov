import React, {Fragment} from 'react';
const EstatusBox = (props) => {
  let {estatus, localidad} = props;
  let descripcion = [
    [
      "Actividades esenciales (Incluyen minería, construcción y fabricación de equipo de transporte)"
    ],
    [
      "Actividades esenciales y operación reducida en las no escenciales",
      "Espacios públicos al aire libre de manera limitada",
      "Máximo cuidado a poblaciones vulnerables"
    ],
    [
      "Actividades esenciales y no esenciales en operación plena",
      "Espacios públicos al aire librede manera limitada",
      "Espacios bajo techo de manera limitada (cines, restaurantes, centros comerciales, lugares de culto)",
      "Cuidado medio a poblaciones vulnerables"
    ],
    [
      "Actividades esenciales y no esenciales en operación plena",
      "Espacios públicos al aire libre y bajo techo de manera completa",
      "Se reanudan actividades escolares, sociales y de esparcimiento",
      "Cuidado de control a publaciones vulnerables"
    ]
  ];
  let statusColorClass = '';
  let lbl_estatus = "";
  let txt_descrip = [];
  let renderEdo = false;

  if(estatus !== ''){
    renderEdo = true;
    let {cov_status} = estatus.datos
    switch(cov_status){
      case 1:
      statusColorClass = ' _red';
      lbl_estatus = 'Riesgo máximo';
      txt_descrip = descripcion[cov_status - 1];
      break;
      case 2:
      statusColorClass = ' _orange';
      lbl_estatus = 'Riesgo alto';
      txt_descrip = descripcion[cov_status - 1];
      break;
      case 3:
      statusColorClass = ' _yellow';
      lbl_estatus = 'Riesgo medio';
      txt_descrip = descripcion[cov_status - 1];
      break;
      case 4:
      statusColorClass = ' _green';
      lbl_estatus = 'Riesgo bajo';
      txt_descrip = descripcion[cov_status - 1];
      break;
      default:
    }
  }

  return(
    <Fragment>
      {
        renderEdo && (
          <div className="localidad_estatus_box">
            <h2>{localidad.toUpperCase()}</h2>
            <h3>Semáforo de reactivación <span className={statusColorClass}>{lbl_estatus}</span></h3>
            <ul>
              {
                txt_descrip.map((item, i) => {
                  return <li key={i}>{item}</li>
                })
              }
            </ul>
          </div>
        )
      }
    </Fragment>
  );
}
export default EstatusBox;
