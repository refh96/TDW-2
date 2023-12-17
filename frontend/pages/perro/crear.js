import { useState } from 'react'
import axios from 'axios'
import {Button, Container, Heading, HStack, Input, Stack, FormControl, FormLabel, Select, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import perroValidation from '../../validation/perroValidacion'

const crearPerro = () =>{

  const router = useRouter()


  const [perro, setPerro] = useState({
    nombre: '',
    url_foto: '',
    descripcion: ''
  })
  

  const createPerro = async (perro) =>{
    const response = await axios.post(`http://127.0.0.1:3333/dogs`, perro)
    return response
  }

  

  return (
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign={"center"}>Crear Perro</Heading>
      <Formik
        initialValues = {perro}
        validationSchema = {perroValidation}
        onSubmit={(values => {
          createPerro(values).then(res =>{
            router.push("./list")
          })
        })}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit} id = "form">
            <Stack spacing={4} mt ={10}>
              <FormControl id = 'nombre'>
                <FormLabel>Nombre</FormLabel>
                <Input type="text" placeholder="Nombre" name = "nombre" onChange={handleChange} onBlur={handleBlur} value = {values.nombre}/>
                {touched.nombre && errors.nombre && (
                  <p>{errors.nombre}</p>
                )}
              </FormControl>
              <FormControl id = 'descripcion'>
                <FormLabel>descripcion</FormLabel>
                <Input type="text" placeholder="descripcion" name = "descripcion" onChange={handleChange} onBlur={handleBlur} value = {values.descripcion}/>
                {touched.descripcion && errors.descripcion && (
                  <p>{errors.descripcion}</p>
                )}
              </FormControl>
            </Stack>
            <Button colorScheme='blue' mt = {10} mb = {10} type = {"submit"}>Crear</Button>

          </form>
        )}
      </Formik>
    </Container>
  )
}


export default crearPerro

