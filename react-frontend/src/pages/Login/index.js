import React, { useState } from 'react'
import useStyles from './styles';
import SignIn from '../../components/signIn';
import SignUp from '../../components/signUp';
import AlertDialog from '../../errorBoundary';

function Login () {

	const [signInDisplay, setSignInDisplay] = useState(true)

	const classes = useStyles();

	return (
		<div className={classes.container}>
			<AlertDialog />
			{
				signInDisplay
				?
					<SignIn setSignInDisplay={setSignInDisplay} />
				:
					<SignUp setSignInDisplay={setSignInDisplay}/>
			}
		</div>
	)
}

export default Login