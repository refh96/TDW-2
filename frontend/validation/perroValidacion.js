import * as yup from 'yup'

const perroValidation = yup.object({
    nombre: yup.string().min(3, "Debe contener mínimo 3 caracteres")
    .max(50, "Debe contener máximo 50 caracteres")
    .required("El nombre es obligatorio")
    .matches(/^[a-zA-Z ]+$/,"El nombre no puede contener caracteres especiales"),
    descripcion: yup.string().min(3, "Debe contener mínimo 3 caracteres")
    .max(50, "Debe contener máximo 50 caracteres")
    .required("descripcion obligatoria")
    .matches(/^[a-zA-Z ]+$/,"La descripcion no puede contener caracteres especiales")
})

export default perroValidation