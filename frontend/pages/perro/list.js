import { useState, useEffect } from 'react'
import { Container, Stack, Heading, Tr, Td, Thead, Table, Tbody, Button} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const listarPerro = () => {

    const router = useRouter()

    const [perros, setPerros] = useState([])
    
    const getPerros = async () => {
        const response = await axios.get(`http://127.0.0.1:3333/dogs`)
        setPerros(response.data)
    }

    const contentTable = () => {
        return perros.map((perro => {
            return (
                <Tr key={perro._id} >
                    <Td onClick={()=>router.push(`./tinder?=${perro.id}`)}>{perro.nombre}</Td>
                    <Td>
                    <img src={perro.url_foto}  style={{ width: '100px', height: 'auto' }} />
                    </Td>
                    <Td>{perro.descripcion}</Td>
                    <Button colorScheme='red' onClick={()=>router.push(`./eminem`)}>tinder</Button>
                    <Button colorScheme='red' onClick={()=>router.push(`./cargarFoto`)}>cargarFoto</Button>
                    <Button colorScheme='blue' onClick={()=>router.push(`./edit/${perro._id}`)}>Editar</Button>
                    <Button colorScheme='red' onClick={()=>router.push(`./borrar/${perro._id}`)}>Borrar</Button>
                </Tr>
            )
        }))
    }

    useEffect(() => {
        getPerros()
    }, [])

    console.log(perros)

    return (
        <Container maxW='container.xl'>
            <Heading as='h1' size = '2xl' textAlign='center' mt = '10' color = 'blue.400'> Listado de perros </Heading>
            <Stack spacing = {4} mt = '10'>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Td>Nombre</Td>
                        <Td>url_foto</Td>
                        <Td>descripcion</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {contentTable()}
                </Tbody>
            </Table>
            </Stack>
        </Container>
    )
}

export default listarPerro