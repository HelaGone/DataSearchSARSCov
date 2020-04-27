import React, {Fragment} from 'react';
const ErrorBox = () => {
  return(
    <Fragment>
      <div className="">
        <h3>La búsqueda no produjo ningún resultado</h3>
        <p>¡Inténtalo de nuevo con otros términos de búsqueda!</p>
      </div>
    </Fragment>
  );
}
export default ErrorBox;
