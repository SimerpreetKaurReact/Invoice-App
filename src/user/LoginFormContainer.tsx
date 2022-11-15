import React from 'react'
import { AuthApi } from '../api/auth'
import { useCompanyAuthContext } from '../company/CompanyDetailsAuth'
import useAsync, { AsyncStateEnum } from '../hooks/useAsync'
import { useAuthContext } from './AuthContext'
import LoginForm from './LoginForm'

function LoginFormContainer() {
    const { status, data, error, execute } = useAsync(AuthApi.login)
    const { persistLogin, AuthError } = useAuthContext()
    const { persistCompanyDetails } = useCompanyAuthContext()
    return (
        <>



            <LoginForm disabled={status === AsyncStateEnum.PENDING} error={error} onLoginRequest={async (values) => {

                //set some flag to loading
                console.log('onloginRequest', values)
                const result = await execute(values)
                console.log("login result", result)
                //JSON check, if result is valid
                //result contains token 
                persistLogin(result?.token)
                if (result?.companyDetails) {
                    console.log("login after", result)

                    persistCompanyDetails(result?.companyDetails)
                }

            }

            } />
        </>
    )
}

export default LoginFormContainer