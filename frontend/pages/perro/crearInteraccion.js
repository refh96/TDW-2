import { useState } from 'react'
import axios from 'axios'
import {Button, Container, Heading, HStack, Input, Stack, FormControl, FormLabel, Select, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import interaccionValidation from '../../validation/interaccionValidacion'
import Swal from 'sweetalert2'

const crearInteraccion = () =>{

  const router = useRouter()


  const [interaccion, setInteraccions] = useState({
    perro_interesado_id: '',
    perro_candidato_id: '',
    preferencia: ''
  })
  

  const createInteraccions = async (interaccion) =>{
    const response = await axios.post(`http://127.0.0.1:3333/interaccions`, interaccion)
    return response
  }

  function alert(e) {

    try {
      Swal.fire({
        title: 'Interaccion creada',
        text: 'El registro se ha guardado exitosamente',
        icon: 'success'
      })
    } catch (errors) {
      Swal.fire({
        title: 'Error',
        text: errors.message,
        icon: 'error',
      })
    }
  }

  function alert2(e) {
      Swal.fire({
        title: 'Hay Match!',
        icon: 'success'
      })
    }


  return (
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign={"center"}>Matchea</Heading>
      <Formik
        initialValues = {interaccion}
        validationSchema = {interaccionValidation}
        onSubmit={(values => {
          createInteraccions(values).then(res =>{
            router.push("../usuario")
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
              <FormControl id = 'perro_interesado_id'>
                <FormLabel>interesado</FormLabel>
                <Input type="text" placeholder="perro_interesado_id" name = "perro_interesado_id" onChange={handleChange} onBlur={handleBlur} value = {values.perro_interesado_id}/>
                {touched.perro_interesado_id && errors.perro_interesado_id && (
                  <p>{errors.perro_interesado_id}</p>
                )}
              </FormControl>
              <FormControl id = 'perro_candidato_id'>
                <FormLabel>candidato</FormLabel>
                <Input type="text" placeholder="perro_candidato_id" name = "perro_candidato_id" onChange={handleChange} onBlur={handleBlur} value = {values.perro_candidato_id}/>
                {touched.perro_candidato_id && errors.perro_candidato_id && (
                  <p>{errors.perro_candidato_id}</p>
                )}
              </FormControl>
              <FormControl id = 'preferencia'>
                <FormLabel>preferencia</FormLabel>
                <Select placeholder='Select option' name = "preferencia" onChange={handleChange} onBlur={handleBlur} value = {values.preferencia}>
                      <option value='R'>R</option>
                      <option value='A' onClick={() =>{ alert2()}}>A</option>
                </Select>
                {touched.preferencia && errors.preferencia && (
                <p>{errors.preferencia}</p>
                )}
              </FormControl>
            </Stack>
            <Button colorScheme='blue' mt = {10} mb = {10} onClick={() =>{ alert()}} type = {"submit"}>Crear</Button>

          </form>
        )}
      </Formik>
    </Container>
  )
}


export default crearInteraccion

