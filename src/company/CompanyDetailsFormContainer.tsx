import React, { useEffect } from 'react'
import { AuthApi } from '../api/auth'
import useAsync, { AsyncStateEnum } from '../hooks/useAsync'
import { CompanyAuthState, useCompanyAuthContext } from './CompanyDetailsAuth'
import CompanyForm from './CompanyForm'
import { useSnackbar } from 'notistack';

function CompanyFormContainer() {
    const { status, data, error, execute } = useAsync(AuthApi.updateCompany)
    const { persistCompanyDetails } = useCompanyAuthContext()
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {



    }, [])

    return (
        <>

            {/* {error === "Error: 500" && "Something went wrong, please try again"}
            {console.log(error)}
            {error === "Error: 400" && "Invalid Credentials"} */}
            <CompanyForm disabled={status === AsyncStateEnum.PENDING} error={error} onCompanyRequest={async (values) => {

                //set some flag to loading
                console.log('onCompanyRequest', values)
                const result = await execute(values)
                console.log("Company result", result)
                //JSON check, if result is valid
                //result contains token 
                persistCompanyDetails(result)
                enqueueSnackbar(`Company details added successfully`, { variant: "success" })

            }

            } />
        </>
    )
}

export default CompanyFormContainer