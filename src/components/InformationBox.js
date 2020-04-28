import React from 'react';

const InformationBox = (props) => {
  // console.log(props.data);

  let {localidad, data} = props;
  console.log(data.datos.activos);
  let colorClass = 'inner_wrapper';

  if(data.datos.activos >=0 && data.datos.activos <51){
    colorClass += ' light_green_bg';
  }else if(data.datos.activos >50 && data.datos.activos <101){
    colorClass += ' green_bg';
  }else if(data.datos.activos >100 && data.datos.activos <251){
    colorClass += ' yellow_bg';
  }else if(data.datos.activos >250 && data.datos.activos <501){
    colorClass += ' orange_bg';
  }else if(data.datos.activos >500 && data.datos.activos <1001){
    colorClass += ' red_bg';
  }else if(data.datos.activos >1000 && data.datos.activos <3001){
    colorClass += ' dark_red_bg';
  }


  return(
    <div className={colorClass}>
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
