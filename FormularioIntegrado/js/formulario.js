
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function MyForm(props) {
    const { 
        isValid, 
        isSubmitting, 
    } = props;

  return (
    <Form>
      <div className="row">
        Email:
        <Field type="email" name="email" className="input" />
        <ErrorMessage name="email">
            {message => <div className="error">{message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        Password:
        <Field type="password" name="password" className="input" />
        <ErrorMessage name="password">
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
            email: props.defaultEmail,
            password: "",
        };
    },

  async validate(values) {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
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

const domContainer = document.querySelector('#contact_form');
const root = ReactDOM.createRoot(domContainer);
root.render((MyForm));