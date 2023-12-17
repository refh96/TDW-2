// ListaPerrosAceptados.js
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';


function ListaPerrosAceptados({ perrosAceptados, onMoverPerro }) {


  

  return (
    <div>
      <h2>Perros Aceptados</h2>
      <ul>
        {perrosAceptados.map((perro, index) => (
          <li key={index}>
            <img src={perro.imagen} alt={perro.nombre} />
            <p>{perro.nombre}</p>
            <Button onClick={() => onMoverPerro(perro)}>Rechazar</Button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaPerrosAceptados;