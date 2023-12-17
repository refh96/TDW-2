import {useState} from 'react'
import {Button, Container, Heading, HStack, Input, Stack, FormControl, FormLabel, Select, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import { Formik } from 'formik'
import perroValidation from '../../validation/perroValidacion'
const cargarFoto = () => {

    const [file, setFile] = useState(null)

    const selectedHandler = (e) => {
        if (e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
      }
      const sendHandler = ()=>{
        if(!file){
          alert('you must upload file')
          return
        }
    
        const formdata= new FormData()
        formdata.append('avatar',file)
        fetch('http://127.0.0.1:3333/cargar_foto/',{
          method:'POST',
          body:formdata
        })
        .then(res => res.text())
        .then(ress => console.log(res))
        .catch(err => {
          console.error(err)
        })
        setFile(null)
      }
      return (
        <Container maxW="container.xl" mt={10}>
          <Heading size="2xl" textAlign={"center"}>CargarFoto</Heading>
          <Formik
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
                  <FormControl id = 'url_foto'>
                    <FormLabel>foto</FormLabel>
                    <Input type="file" placeholder="url_foto" name = "url_foto" onChange={selectedHandler} onClick={sendHandler} />
                    {touched.url_foto && errors.url_foto && (
                      <p>{errors.url_foto}</p>
                    )}
                    </FormControl>
                </Stack>
                <Button colorScheme='blue' mt = {10} mb = {10} type = {"submit"}>Agregar</Button>
    
              </form>
            )}
          </Formik>
        </Container>
      )
}

export default cargarFoto