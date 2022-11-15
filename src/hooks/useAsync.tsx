import { useCallback, useState } from "react"
export const enum AsyncStateEnum {
    INITIAL, PENDING, SUCCESS, ERROR
}
const useAsync = <T, P, E = string>(asyncOperation: (params: P) => Promise<T>) => {
    const [fetchStatus, setFetchStatus] = useState<AsyncStateEnum>(AsyncStateEnum.INITIAL)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<T | null>(null)
    return {
        status: fetchStatus,
        data,
        error,
        execute: useCallback(async (params: P) => {
            setFetchStatus(AsyncStateEnum.PENDING)
            try {
                const response = await asyncOperation(params)
                setFetchStatus(AsyncStateEnum.SUCCESS)
                setData(response)
                return response
            }
            catch (err) {
                console.log(err, "within async")
                setError(`${err}`)
                setFetchStatus(AsyncStateEnum.ERROR)

            }
        }, [asyncOperation])
    }
}
export default useAsync