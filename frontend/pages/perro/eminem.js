import { useState, useEffect } from 'react';
import { QueryClientProvider } from 'react-query';
import { Button, Box, Typography, PetsIcon } from '@chakra-ui/react';
import axios from 'axios';
import ListaPerrosAceptados from './ListaPerrosAceptados'
import ListaPerrosRechazados from './ListaPerrosRechazados'


function eminem() {
  
  const cargarImagenRandom = async () => {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    return response.data.message;
  };

  const [nombrePerroCandidato, setNombrePerroCandidato] = useState('');
  const [PerroAceptado, setPerroAceptado] = useState([]);
  const [PerroRechazado, setPerroRechazado] = useState([]);
  const { data, isLoading, refetch } = QueryClientProvider('PerroRandom', cargarImagenRandom);
  useEffect(() => {
    if (!nombrePerroCandidato) {
      setNombrePerroCandidato(generarNombre());
    }
  }, [nombrePerroCandidato]);
  

  const PerroA = () => {
    if (nombrePerroCandidato) {
      const nuevoPerro = {
        imagen: data,
        nombre: nombrePerroCandidato,
        descripcion: 'Descripción del perro',
      };
  
      setPerroAceptado([...PerroAceptado, nuevoPerro]);
      setNombrePerroCandidato(generarNombre());
      refetch();
    }
  };
  

  const PerroR = () => {
    if (nombrePerroCandidato) {
      const nuevoPerro = {
        imagen: data,
        nombre: nombrePerroCandidato,
        descripcion: 'Descripción del perro',
      };
      setPerroRechazado([...PerroRechazado, nuevoPerro]);
      setNombrePerroCandidato(generarNombre());
      refetch();
    }
  };
  const moverPerroAceptado = (perro) => {
    setPerroAceptado([...PerroAceptado, perro]);
    setPerroRechazado(PerroRechazado.filter((p) => p !== perro));
  };

  const moverPerroRechazado = (perro) => {
    setPerroRechazado([...PerroRechazado, perro]);
    setPerroAceptado(PerroAceptado.filter((p) => p !== perro));
  };

  return (

      <div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} textAlign={"center"} >
          <PetsIcon/>
            <Typography variant="h4" >Adopta un Perro</Typography>
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              <div>
                <img src={data} alt="PerroCandidato" />
                <Typography variant="h6">{nombrePerroCandidato}</Typography>
              </div>
            )}
          </Box>
          <Box textAlign={"center"}>
            <Button type='button' variant="contained" color="primary" onClick={PerroA} >
              Aceptar
            </Button>
            <Button type='button' variant="contained" color="secondary" onClick={PerroR}>
              Rechazar
            </Button>
          </Box>
        </Box>
        <ListaPerrosAceptados perrosAceptados={PerroAceptado} onMoverPerro={moverPerroRechazado} />
        <ListaPerrosRechazados perrosRechazados={PerroRechazado} onMoverPerro={moverPerroAceptado} />
      </div>
    );
}

function generarNombre() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomName = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomName += characters.charAt(randomIndex);
  }
  return randomName;
}

export default eminem;