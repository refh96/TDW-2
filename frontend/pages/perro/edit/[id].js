import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Button, Container, Heading, HStack, Input, Stack, FormControl, FormLabel, Select, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import Swal from 'sweetalert2'


const getPerro = async (id) => {
  const response = await axios.get(`http://127.0.0.1:3333/dogs/${id}`)
  return response
}

export const getServerSideProps =  async (context) => {
  const response = await getPerro(context.query.id)
  return {
    props: {
      perro: response.data
    }
  }
}

function handleSubmit(e) {

  try {
    Swal.fire({
      title: 'Perro Editado',
      text: 'El registro se ha Editado exitosamente',
      icon: 'success'
    })
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error',
    })
  }
}

const editar = ({perro}) => {
  
  const router = useRouter()

  const [perro2, setPerro] = useState(perro)

  const updatePerro = async (perro) =>{
    const response = await axios.put(`http://127.0.0.1:3333/dogs/${router.query.id}`, perro)
    return response
  }

  const handleChange = (e) => {
    setPerro ({
      ...perro2,
      [e.target.name]: e.target.value
    })
  }

  console.log(perro2)

  const submitPerro = (e) => {
    
    updatePerro(perro2).then(res => {
      console.log('perro modificado')
      router.push('../list')
    })
  }

  return (
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign={"center"}>Editar Perro: {perro2.nombre} {perro2.descripcion}</Heading>
      <Stack spacing={4} mt ={10}>
        <FormControl id = 'nombre'>
          <FormLabel>Nombre</FormLabel>
          <Input type="text" placeholder="nombre" name = "nombre" onChange={handleChange} value = {perro2.nombre}/>
        </FormControl>
        <FormControl id = 'descripcion'>
          <FormLabel>descripcion</FormLabel>
          <Input type="text" placeholder="descripcion" name = "descripcion" onChange={handleChange} value = {perro2.descripcion}/>
        </FormControl>
      </Stack>
      <Button colorScheme='blue' mt = {10} mb = {10} onClick={() =>{submitPerro(); handleSubmit()}}>Modificar</Button>
    </Container>
  )
}



export default editar