import { useState } from 'react'
import axios from 'axios'
import {Button, Container, Heading, HStack, Input, Stack, FormControl, FormLabel, Select} from '@chakra-ui/react'

const editarPerro = () =>{
  const [perro, setPerro] = useState({
    nombre: '',
    descripcion: ''
  })
  
  console.log(perro)

  const handleChange = (e) => {
    setPerro({
      ...perro,
      [e.target.name]:e.target.value
    })
  }

  const createPerro = async (perro) =>{
    const response = await axios.post(`http://127.0.0.1:3333/dogs`, perro)
    return response
  }

  const submitPerro = (e) => {
    e.preventDefault()
    createPerro(perro).then(res => {
      console.log('data mandada')
    })
  }

  

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            inicio
          </a>
          <a className="navbar-brand" href="../usuario">
            usuario
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto"></ul>
          </div>
        </div>
      </nav>
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign={"center"}>Editar Arrendatario</Heading>
      <Stack spacing={4} mt ={10}>
        <FormControl id = 'nombre'>
          <FormLabel>Nombre</FormLabel>
          <Input type="text" placeholder="Nombre" name = "nombre" onChange={handleChange}/>
        </FormControl>
        <FormControl id = 'descripcion'>
          <FormLabel>descripcion</FormLabel>
          <Input type="text" placeholder="descripcion" name = "descripcion" onChange={handleChange}/>
        </FormControl>
      </Stack>
      <Button colorScheme='blue' mt = {10} mb = {10} onClick={submitPerro}>editar</Button>
    </Container>
    </>
  )
}

export default editarPerro