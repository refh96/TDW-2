import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {Button, Container, Heading, HStack, Input, Stack, FormControl, FormLabel, Select, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import Swal from 'sweetalert2'


const getPerro = async (id) => {
  const response = await axios.get(`${process.env.SERVIDOR}/perro/search/${id}`)
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
      title: 'perro Eliminado',
      text: 'El registro se ha eliminado exitosamente',
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

  const deletePerro = async () =>{
    const response = await axios.delete(`${process.env.SERVIDOR}/perro/delete/${router.query.id}`)
    return response
  }

  const submitPerro = (e) => {
    
    deletePerro(perro).then(res => {
      console.log('perro modificado')
      router.push('../list')
    })
  }

  const cancelar= function(){
    router.push('../list')
  }

  return (
    <Container maxW="container.xl" mt={10}>
      <Heading size="2xl" textAlign={"center"}>Esta seguro de eliminar al perro: {perro.nombre} {perro.descripcion}</Heading>
      <Stack spacing={4} mt ={5}>
        <Button colorScheme='red' mt = {2} mb = {2} onClick={() =>{submitPerro(); handleSubmit()}}>Eliminar</Button>
        <Button colorScheme='blue' mt = {2} mb = {2} onClick={cancelar}>Cancelar</Button>
      </Stack>
    </Container>
  )
}



export default editar