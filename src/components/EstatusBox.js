import React from 'react';
const EstatusBox = (props) => {
  let {estatus} = props;
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

  let statusColorClass = 'localidad_estatus_box';
  let lbl_estatus = "";
  let txt_descrip = [];

  if(estatus != ''){
    let {cov_status} = estatus.datos
    switch(cov_status){
      case 1:
      statusColorClass += ' _red';
      lbl_estatus = 'Rojo';
      txt_descrip = descripcion[cov_status - 1];
      break;
      case 2:
      statusColorClass += ' _orange';
      lbl_estatus = 'Naranja';
      txt_descrip = descripcion[cov_status - 1];
      break;
      case 3:
      statusColorClass += ' _yellow';
      lbl_estatus = 'Amarillo';
      txt_descrip = descripcion[cov_status - 1];
      break;
      case 4:
      statusColorClass += ' _green';
      lbl_estatus = 'Verde';
      txt_descrip = descripcion[cov_status - 1];
      break;
      default:
    }
  }

  console.log(txt_descrip);
  return(
    <div className={statusColorClass}>
      <h3>
        {lbl_estatus}
      </h3>
      <ul>
        {
          txt_descrip.map((item, i) => {
            return <li key={i}>{item}</li>
          })
        }
      </ul>
    </div>
  );
}
export default EstatusBox;
