import React, {Fragment} from 'react';
const EstatusBox = (props) => {
  let {estatus, localidad} = props;
  const weeekdays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
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

  let todayDate = new Date();
  let day = weeekdays[todayDate.getDay()];
  let daynum = todayDate.getDate();
  let month = months[todayDate.getMonth()];
  let year = todayDate.getFullYear();

  return(
    <Fragment>
      {
        renderEdo && (
          <div className="localidad_estatus_box">
            <div className="update_date">
              <p>ACTUALIZADO: <span>{`${day}, ${daynum}/${month}/${year}`}</span></p>
            </div>
            <h2>{localidad.toUpperCase()}</h2>
            <h3>Semáforo de reactivación: </h3>
            <p className={statusColorClass}>{lbl_estatus}</p>
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
