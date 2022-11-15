import { render, screen } from '@testing-library/react'
import LoginForm from '../src/user/LoginForm'
import '@testing-library/jest-dom'

describe('LoginForm', () => {
  it('renders properly', () => {
    render(<LoginForm onLoginRequest={async (values) => { }} />)

    const emailLabel = screen.getByText("email")
    expect(emailLabel).toBeInTheDocument()
  })
  it('snapshots properly', () => {
    const { container } = render(<LoginForm onLoginRequest={async (values) => { }} />)

    expect(container).toMatchSnapshot()
  })
})