import React from "react";
import { withFormik, Field, ErrorMessage, Form } from "formik";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function validateDNI(dni) {
  var numero, lett, letra;
  var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

  dni = dni.toUpperCase();

  if(expresion_regular_dni.test(dni) === true){
      numero = dni.substr(0,dni.length-1);
      numero = numero.replace('X', 0);
      numero = numero.replace('Y', 1);
      numero = numero.replace('Z', 2);
      lett = dni.substr(dni.length-1, 1);
      numero = numero % 23;
      letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
      letra = letra.substring(numero, numero+1);
      if (letra != lett) {
          //alert('Dni erroneo, la letra del NIF no se corresponde');
          return 'Dni erroneo, la letra del NIF no se corresponde';
      }else{
          //alert('Dni correcto');
          return 'Dni correcto';
      }
  }else{
      //alert('Dni erroneo, formato no válido');
      return 'Dni erroneo, formato no válido';
  }
}

function MyForm(props) {
    const { 
        isValid, 
        isSubmitting, 
    } = props;

  return (
    <Form>
    <div className="row">
        Nombre:
        <Field type="text" name="nombre" className="input" />
        <ErrorMessage name="nombre">
            {message => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        Email:
        <Field type="email" name="email" className="input" />
        <ErrorMessage name="email">
            {message => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        DNI:
        <Field type="text" name="dni" className="input" />
        <ErrorMessage name="dni">
            {message => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        Mensaje:
        <Field component="textarea" rows="6" name="mensaje" className="input" />
        <ErrorMessage name="mensaje">
            {message => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        <button
          type="submit"
          className={`submit ${isSubmitting || !isValid ? "disabled" : ""}`}
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </div>
      <div className="row" id="ok"></div>
    </Form>
  );
}

export default withFormik({
    mapPropsToValues(props) {
        return {
            mensaje: props.mensaje || "Deja tu mensaje aquí",
        };
    },

  async validate(values) {
    const errors = {};

    if (!values.nombre) {
      errors.nombre = "Este campo es obligatorio";
    }
    if (!values.dni) {
      errors.dni = "Este campo es obligatorio";
    } else if (validateDNI(values.dni) != 'Dni correcto') {
      errors.dni = validateDNI(values.dni);
    }

    if(!values.email){
        errors.email = "Este campo es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Email no válido";
    }

    await sleep(500);

    if (Object.keys(errors).length) {
        return errors;
    }
  },

  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    console.log(values);
    const info = document.getElementById("ok");
    const ok = document.createElement("div");
    ok.className = "ok";
    ok.textContent = "Datos enviados correctamente";
    info.appendChild(ok);
  },
})(MyForm);
