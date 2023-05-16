import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El correo no es correcto")
      .required("El correo es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
  });
}
