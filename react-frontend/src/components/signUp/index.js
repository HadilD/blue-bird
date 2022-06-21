import React, { useState } from 'react';
 import { Formik } from 'formik';
import { registerUser } from '../../services/auth';
import Alert from '@mui/material/Alert'; 
import useStyles from './styles';

function SignUp (props) {
  const classes = useStyles();
  const {setSignInDisplay} = {...props}
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState(false)
  return (
  <div className={classes.signInContainer}>
    <h2 className={classes.heading}>Register With Us</h2>
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
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          <div className={classes.formControl}>
            <label className={classes.label}>First Name</label>
            <input
              className={classes.input}
              type="text"
              name="firstName"
              onChange={handleChange}
              value={values.firstName}
            />
          <p className={classes.errorMsg}>{errors.firstName && touched.firstName && errors.firstName}</p>
          </div>
          <div className={classes.formControl}>
            <label className={classes.label}>Last Name</label>
              <input
                className={classes.input}
                type="text"
                name="lastName"
                onChange={handleChange}
                value={values.lastName}
              />
            <p className={classes.errorMsg}>{errors.lastName && touched.lastName && errors.lastName}</p>
          </div>
          <div className={classes.formControl}>
            <label className={classes.label}>Email</label>
            <input
              className={classes.input}
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            <p className={classes.errorMsg}>{errors.email && touched.email && errors.email}</p>
          </div>
          <div className={classes.formControl}>
            <label className={classes.label}>Password</label>
            <input
              className={classes.input}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password}
            />
            <p className={classes.errorMsg}>{errors.password && touched.password && errors.password}</p>
          </div>
          <div className={classes.formControl}>
            <label className={classes.label}>Confirm Password</label>
            <input
              className={classes.input}
              type="password"
              name="password2"
              onChange={handleChange}
              value={values.password2}
            />
            <p className={classes.errorMsg}>{errors.password2 && touched.password2 && errors.password2}</p>
          </div>
          <button className={classes.button} type="submit" disabled={false}>Submit</button>
        </form>
      )}
    </Formik>
    <p className={classes.signUpStatement}>Back to <span className={classes.register} onClick={() => setSignInDisplay(true)}>SignIn</span></p>
    {
      registerSuccessMsg && <Alert severity="success">Registration Successful</Alert>
    }
  </div>
    )
}

export default SignUp