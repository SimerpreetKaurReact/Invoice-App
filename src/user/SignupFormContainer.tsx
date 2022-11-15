import { useRouter } from 'next/router'
import React from 'react'
import { AuthApi } from '../api/auth'
import useAsync, { AsyncStateEnum } from '../hooks/useAsync'
import { useAuthContext } from './AuthContext'
import SignupForm from './SignupForm'
import { useSnackbar } from 'notistack';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function SignupFormContainer() {
    const { status, data, error, execute } = useAsync(AuthApi.signup)
    const { enqueueSnackbar } = useSnackbar();



    const router = useRouter()
    return (
        <SignupForm disabled={status === AsyncStateEnum.PENDING} error={error} onSignupRequest={async (values) => {

            //set some flag to loading
            console.log('onSignupRequest', values)
            let result = await execute({
                name: values.firstName.concat(" ", values.lastName),
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword
            })
            console.log("signup result", result)
            if (result?.user_id) {

                enqueueSnackbar(`Welcome to invoicer ${values.firstName}, sign up successfull`, { variant: "success" })
                router.push("/login");

            } else {
                enqueueSnackbar(`Error ${error},please try again`, { variant: 'error' })
            }
            //JSON check, if result is valid
            //result contains token 

        }
        } />
    )
}

export default SignupFormContainer