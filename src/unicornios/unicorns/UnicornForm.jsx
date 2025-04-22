import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; //useParams: para acceder a los parametros de la URL, como el id
import { Button, InputText, InputNumber, Card } from "primereact";
import { useUnicorns } from "../../context/UnicornContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const UnicornForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUnicornById, createUnicorn, editUnicorn } = useUnicorns();

  const [unicorn, setUnicorn] = useState({
    name: "",
    color: "",
    age: "",
    power: ""
  })

  useEffect(() => {
    if (id) {
      const foundUnicorn = getUnicornById(id);
      if (foundUnicorn) {
        setUnicorn(foundUnicorn);
      }
    }
  }, [id, getUnicornById])

  const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    color: Yup.string().required("El color es obligatorio"),
    age: Yup.number()
      .positive("La edad debe ser mayor que 0")
      .required("La edad es obligatoria"),
    power: Yup.string().required("El poder es obligatorio")
  })

  const handleSubmit = (values) => {
    if (id) {
      editUnicorn(id, values);
    } else {
      createUnicorn(values);
    }
    navigate("/unicornios");
  }

  return (
    <Card>
      <h2>{id ? "🌟🌸🌈Editar Unicornio🌟🌸🌈" : "🌟🌸🌈Crear Nuevo Unicornio🌟🌸🌈"}</h2>
      <Formik
        initialValues={{
          name: unicorn?.name || "",
          color: unicorn?.color || "",
          age: unicorn?.age || "",
          power: unicorn?.power || "",
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="p-fluid">
          <div className="p-field">
            <label htmlFor="name">Nombre</label>
            <Field name="name" id="name" as={InputText} />
            <ErrorMessage name="name" component="small" className="p-error" />
          </div>

          <div className="p-field">
            <label htmlFor="color">Color</label>
            <Field name="color" id="color" as={InputText} />
            <ErrorMessage name="color" component="small" className="p-error" />
          </div>

          <div className="p-field">
          <label htmlFor="age">Edad</label>
            <Field name="age">
                {({ field, form }) => (
                <InputNumber
                    id="age"
                    value={field.value}
                    onValueChange={(e) => form.setFieldValue("age", e.value)}/>
                )}
            </Field>
            <ErrorMessage name="age" component="small" className="p-error" />
          </div>

          <div className="p-field">
            <label htmlFor="power">Poder</label>
            <Field name="power" id="power" as={InputText} />
            <ErrorMessage name="power" component="small" className="p-error" />
          </div>

          <Button type="submit" label="Guardar" className="mt-2" />
        </Form>
      </Formik>
    </Card>
  );
}

export default UnicornForm;
