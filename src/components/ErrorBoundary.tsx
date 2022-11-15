import React from "react"
interface ErroBoundaryProps {
    children?: React.ReactNode
}
interface ErrorBoundaryState {
    hasError: boolean
}
export class ErrorBoundary extends React.Component<ErroBoundaryProps, ErrorBoundaryState> {
    state = { hasError: false }

    static getDerivedStateFromError(error: unknown) {
        //update the state so that the next render will show the fallback UI
        return { hasError: true }
    }
    componentDidCatch(error: unknown, errorInfo: unknown) {
        //you can also log the error to an error reporting service
        console.log("logErrorToMyService", error, errorInfo)
        //you can add sentry or any such error logging service here

    }
    render() {
        if (this.state.hasError) {
            //you can render any custom fallback UI
            return <h1>something went wrong</h1>
        }
        return this.props.children
    }
}