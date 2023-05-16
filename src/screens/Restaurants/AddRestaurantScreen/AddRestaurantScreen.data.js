import * as Yup from "yup";

export function initialValues() {
  return {
    name: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    location: "",
    images: [],
  };
}

export function validationSchema() {
  return Yup.object({
    name: Yup.string().required("Campo Obligatorio"),
    address: Yup.string().required("Campo Obligatorio"),
    phone: Yup.string().required("Campo Obligatorio"),
    email: Yup.string()
      .email("Este no es un email")
      .required("Campo Obligatorio"),
    description: Yup.string().required("Campo Obligatorio"),
    location: Yup.object().required("La localizacion es requerida"),
    images: Yup.array()
      .min(1, "Se require una imagen como minimo")
      .required("La imagen es requerida"),
  });
}
