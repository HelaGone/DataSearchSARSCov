import React from 'react';

const InformationBox = (props) => {
  // console.log(props.data);

  let {localidad} = props;

  return(
    <div className="inner_wrapper">
      <h2 className="localidad_name">{localidad.toLowerCase()}</h2>
      <ul className="result_list">
        <li>
          <span>Positivos: {props.data.datos.positivos}</span>
          <span></span>
        </li>
        <li>
          <span>Activos: {props.data.datos.activos}</span>
          <span></span>
        </li>
        <li>
          <span>Negativos: {props.data.datos.negativos}</span>
          <span></span>
        </li>
        <li>
          <span>Muertes: {props.data.datos.defunciones}</span>
          <span></span>
        </li>
        <li>
          <span>Pendientes: {props.data.datos.pendientes}</span>
          <span></span>
        </li>
      </ul>
    </div>
  );
}

export default InformationBox;
