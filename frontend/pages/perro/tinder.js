import { useState, useEffect } from 'react';
import { Container, Stack, Heading, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const Tinder = () => {
  const router = useRouter();
  const [perroInteresadoId, setPerroInteresadoId] = useState(null);
  const [perro, setPerros] = useState([])
  const [perrosCandidatos, setPerrosCandidatos] = useState([]);
  const [aceptadoInput, setAceptadoInput] = useState('');
  const [rechazadoInput, setRechazadoInput] = useState('');
  const [respuesta, setRespuesta] = useState(null);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setPerroInteresadoId(id);
    }
  }, [router.query]);

  const alert = () => {
    try {
      Swal.fire({
        title: 'Aceptado',
        text: '¡Hay match!',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
      });
    }
  };

  const enviarSolicitud = async () => {
    try {
      const url = 'http://127.0.0.1:3333/dogs/preferencias';
      const { id } = router.query;

      const data = {
        perro_interesado_id: perro.id,
        perro_candidatos_aceptados: [aceptadoInput],
        perro_candidatos_rechazados: [rechazadoInput],
      };

      const response = await axios.post(url, data);
      setRespuesta(response.data);
      router.push('./tinder');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign="center">
        Guardar Preferencias
      </Heading>
      <Stack spacing={4} mt={5}>
        <Input
          placeholder="Perro candidato aceptado"
          value={aceptadoInput}
          onChange={(e) => setAceptadoInput(e.target.value)}
        />
        <Input
          placeholder="Perro candidato rechazado"
          value={rechazadoInput}
          onChange={(e) => setRechazadoInput(e.target.value)}
        />
        <Button colorScheme="blue" onClick={() => { enviarSolicitud(); alert(); }}>
          Enviar Solicitud
        </Button>
        {respuesta && (
          <div>
            <p>Respuesta recibida:</p>
            <pre>{JSON.stringify(respuesta, null, 2)}</pre>
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default Tinder;
