import React from 'react';

const InformationBox = (props) => {

  let {localidad} = props;
  let colorClass = 'inner_wrapper';

  return(
    <div className={colorClass}>
      <h2 className="localidad_name">{localidad.toLowerCase()}</h2>
      <ul className="result_list">
        <li>
          <div className="key_circle bg_green"></div>
          <span> <strong>{props.data.datos.positivos}</strong> positivos </span>
          <span></span>
        </li>
        <li>
        <div className="key_circle bg_yellow"></div>
        <span> <strong>{props.data.datos.negativos}</strong> negativos </span>
        <span></span>
        </li>
        <li>
          <div className="key_circle bg_salmon"></div>
          <span> <strong>{props.data.datos.activos}</strong> activos </span>
          <span></span>
        </li>
        <li>
        <div className="key_circle bg_blue"></div>
        <span> <strong>{props.data.datos.pendientes}</strong> pendientes </span>
        <span></span>
        </li>
        <li>
          <div className="key_circle bg_lightGrey"></div>
          <span> <strong>{props.data.datos.defunciones}</strong> muertes </span>
          <span></span>
        </li>
      </ul>
    </div>
  );
}

export default InformationBox;
