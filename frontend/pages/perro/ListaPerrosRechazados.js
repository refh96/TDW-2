import { useState, useEffect } from 'react'
import { Container, Stack, Heading, Tr, Td, Thead, Table, Tbody, Button} from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ListaPerrosRechazados = () => {

    const router = useRouter()

    const [interacions, setInteraccions] = useState([])
    
    const getInteraccions = async () => {
        const response = await axios.get(`http://127.0.0.1:3333/interaccions?txtBuscar=r`)
        setInteraccions(response.data)
        console.log("Respuesta:", response.data);

    }

    const contentTable = () => {
        return interacions.map((interaccions => {
            return (
                <Tr key={interaccions._id} >
                    <Td onClick={()=>router.push(`./tinder?=${interaccions.id}`)}>{interaccions.perro_interesado_id}</Td>
                    <Td>{interaccions.perro_candidato_id}</Td>
                    <Td>{interaccions.preferencia}</Td>
                    <Td>{interaccions.created_at}</Td>
                </Tr>
            )
        }))
    }

    useEffect(() => {
      getInteraccions()
    }, [])

    console.log(interacions)

    return (
        <Container maxW='container.xl'>
            <Heading as='h1' size = '2xl' textAlign='center' mt = '10' color = 'blue.400'> Listado de perros Rechazados</Heading>
            <Stack spacing = {4} mt = '10'>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Td>perro_interesado_id</Td>
                        <Td>perro_candidato_id</Td>
                        <Td>preferencia</Td>
                        <Td>created_at</Td>
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

export default ListaPerrosRechazados
