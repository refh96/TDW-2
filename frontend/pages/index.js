import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import { Heading, Center, Fade, Image, Container, HStack, Stack, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <>
    <Container maxW="container.xl">
        <Stack spacing = '24px' my={'40'} p='5'>
          <Center>
            <Heading as='h1' color={'blue.100'}>Tinder Perruno</Heading>
          </Center>
          <Center>
            <Image src = 'https://i0.wp.com/ln6.431.myftpupload.com/wp-content/uploads/2015/02/PeTinder.jpg?ssl=1' alt = 'Espacios'/>
          </Center>
          <Button colorScheme='blue' onClick = {()=>router.push('/usuario')}>Usuario</Button>
        </Stack>
    </Container>
    </> )
}