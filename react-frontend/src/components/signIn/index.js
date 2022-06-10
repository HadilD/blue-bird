import React from 'react'
import { Formik } from 'formik';
import { loginUser } from '../../services/auth'
import useStyles from './styles';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function SignIn (props) {
  const classes = useStyles();
  const {setSignInDisplay} = {...props}

  return (
  <div className={classes.signInContainer}>
    <h2 className={classes.heading}>Sign In</h2>
    <Formik
      initialValues={{ email: '', password: '', isAdmin: false }}
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
        <form onSubmit={handleSubmit} className={classes.formContainer}>
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
            <FormGroup>
              <FormControlLabel 
                control={<Checkbox 
                  checked={values.isAdmin} 
                  name="isAdmin" 
                  onChange={handleChange}
                />} 
                label="Are you an Administrator ?" 
              />
            </FormGroup>
          </div>
          <button type="submit" disabled={false} className={classes.button}>
            Submit
          </button>
        </form>
      )}
    </Formik>
    <p className={classes.signUpStatement}>Don't have an account ? <span className={classes.register} onClick={() => setSignInDisplay(false)}>Register with Us</span></p>
  </div>
  )
}

export default SignIn