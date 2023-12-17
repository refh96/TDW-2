import * as yup from 'yup'

const interaccionValidation = yup.object({
    perro_interesado_id: yup.string()
    .max(3, "Debe contener máximo 3 caracteres")
    .required("dato obligatorio"),
    perro_candidato_id: yup.string()
    .max(3, "Debe contener máximo 3 caracteres")
    .required("dato obligatorio"),
    preferencia: yup.string()
    .max(1, "Debe contener máximo 1 caracteres")
    .required("dato obligatorio")
})

export default interaccionValidation