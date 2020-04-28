import React from 'react';

const InformationBox = (props) => {
  // console.log(props.data);

  let {localidad, data} = props;
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
