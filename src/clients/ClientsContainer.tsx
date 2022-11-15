import React, { useEffect } from 'react'
import { fetchClients } from '../api/base'
import SkeltonLoadingList from '../components/SkeltonLoadingList'
import useAsync, { AsyncStateEnum } from '../hooks/useAsync'
import { useAuthContext } from '../user/AuthContext'

type Props = {}

const ClientsContainer = (props: Props) => {
    const { authState } = useAuthContext()

    const { status, data, error, execute } = useAsync(
        fetchClients
    )
    useEffect(() => {
        execute(undefined)
        // setFetchStatus('pending')
        // fetch("http://localhost:3139/clients", {
        //   headers: {
        //     'x-access-token': "555"
        //   }
        // }).then(httpResponse => httpResponse.json())
        //   .then(jsonResponse => {

        //     console.log(jsonResponse)
        //     setClientList(jsonResponse.clients)
        //     setLoading(false)
        //     setFetchStatus('success')
        //   }).catch(err => {
        //     console.log('error', err)
        //     setFetchStatus('error')
        //   })
    }, [])
    return (
        <div>
            {authState} inside clients container
            {status === AsyncStateEnum.PENDING && <SkeltonLoadingList />}
            {data?.total === 0 && status === AsyncStateEnum.SUCCESS ? <p>CTA to add clients </p> : null}
            <ul>
                {data?.clients.map((client) => {
                    return <li key={client.id} >{client.name}</li>
                })}
            </ul>
        </div>
    )
}

export default ClientsContainer