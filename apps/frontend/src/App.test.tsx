import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

test('renders navigation links', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
})
