import React, { useState } from 'react';
 import { Formik } from 'formik';
import { registerUser } from '../../services/auth';
import Alert from '@mui/material/Alert'; 

function SignUp (props) {
    const {setSignInDisplay} = {...props}
    const [registerSuccessMsg, setRegisterSuccessMsg] = useState(false)
    return (
    <div>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '', password2: '' }}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
          } else if (values.email.slice(values.email.length-12) !== '.hs-fulda.de'){
              errors.email = 'Not a member of Fulda organization'
          }

          if (!values.firstName) errors.firstName = 'Required'
          if (!values.lastName) errors.lastName = 'Required'
          if (!values.password) errors.password = 'Required';
          if (values.password !== values.password2) errors.password2 = "Passwords don't match"; 
          
          return errors;
        }}
        
        onSubmit={(values, actions) => {
          console.log('submit clicked:', values)
          let body = {
            'first_name': values.firstName,
            'last_name': values.lastName,
            'email': values.email,
            'password': values.password
          }
          let res = registerUser(body)
          if (res) {
            setRegisterSuccessMsg(true)
            setTimeout(() => {
              setRegisterSuccessMsg(false)
              setSignInDisplay(true)
            }, 2500)
          }
          actions.resetForm({
            values: {firstName: '', lastName: '', email: '', password: '', password2: ''}
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
            <label>First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={values.firstName}
              />
            {errors.firstName && touched.firstName && errors.firstName}
            <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
              />
            {errors.lastName && touched.lastName && errors.lastName}
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
            <label>Confirm Password</label>
            <input
              type="password"
              name="password2"
              onChange={handleChange}
              value={values.password2}
            />
            {errors.password2 && touched.password2 && errors.password2}
            <button type="submit" disabled={false}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <p onClick={() => setSignInDisplay(true)}>SignIn</p>
      {
        registerSuccessMsg && <Alert severity="success">Registration Successful</Alert>
      }
  </div>
    )
}

export default SignUp