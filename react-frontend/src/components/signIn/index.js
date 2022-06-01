import React from 'react'
import { Formik } from 'formik';
import { loginUser } from '../../services/auth'

function SignIn (props) {
    const {setSignInDisplay} = {...props}
    return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
          } else if (values.email.slice(values.email.length-12) !== '.hs-fulda.de'){
              errors.email = 'Not a member of Fulda organization'
          }

          if (!values.password) {
            errors.password = 'Required'; 
          }
          return errors;
        }}
        
        onSubmit={(values, actions) => {
          console.log('submit clicked:', values)
          loginUser(values)
          actions.resetForm({
            values: {email: '', password: ''}
          });

        }}
      >
        {({
          values,
          errors,
          touched,
          resetForm,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={false}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <p>Don't have an account ? <span onClick={() => setSignInDisplay(false)}>Register with Us</span></p>
  </div>
    )
}

export default SignIn