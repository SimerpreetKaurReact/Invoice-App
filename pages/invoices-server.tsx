import { AxiosError } from 'axios'
import { getCookie, removeCookies } from 'cookies-next'
import { GetServerSideProps } from 'next'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { setAPIUserToken } from '../src/api/auth'
import { fetchInvoices, InvoiceDTO } from '../src/api/base'
import { USER_TOKEN_COOKIE_KEY } from '../src/user/AuthContext'
import AuthGuard from '../src/user/AuthGaurd'

type Props = { page: number, invoices: InvoiceDTO, total: number }

const Invoices = (props: Props) => {

    const router = useRouter()
    return (

        <div>
            <button onClick={() => {
                router.push({
                    pathname: router.pathname,
                    query: { ...router.query, page: (props.page ?? 1) - 1 }
                })
            }}>PREV</button>
            <button onClick={() => {
                router.push({
                    pathname: router.pathname,
                    query: { ...router.query, page: (props.page ?? 1) + 1 }
                })
            }}>NEXT</button>
            <pre>{JSON.stringify(props.invoices, null, 4)}</pre></div >
    )
}

export default Invoices

export interface InvoiceGroup { invoices: InvoiceDTO; total: number }




export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

    try {
        const authToken = getCookie(USER_TOKEN_COOKIE_KEY, { req, res }) as string | undefined

        if (!authToken) {
            return {
                redirect: { destination: "/login", permanent: false }
            }
        }
        setAPIUserToken(authToken)

        const invoiceResonse = await fetchInvoices()
        if (!invoiceResonse) {
            return {
                props: {
                    page: 1, invoices: [], total: 0
                }
            }
        }

        return {
            props: {
                page: 1,
                invoices: invoiceResonse?.invoices,
                total: invoiceResonse?.total
            }
        }
    } catch (err) {
        console.log("handle api call errror or syntax error in try block", err)
        if (err instanceof AxiosError) {
            if (err.response?.data === 'Invalid Token') {
                console.log("handle invalid token")
                removeCookies(USER_TOKEN_COOKIE_KEY, { req, res })
                //method of removing cookies on server side 

                return {
                    redirect: {
                        destination: "/login",
                        permanent: false
                    }
                }
            }
        }
        return {
            props: {
                page: 1,
                invoices: [],
                total: 0
            }
        }
    }
}

//create a reusable method for above or use some middleware here
//getstaticsidepropsnb
//create table without datagrid but with seperate components 

//Pages: routing,auth protection,user Info
// containers: data fetching, loading states, error handling
//dumb components: props based, controlled , lifting the state up 
