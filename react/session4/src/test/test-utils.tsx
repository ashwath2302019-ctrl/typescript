import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { InternProvider } from '../contexts/intern-context'
import { ThemeProvider } from '../contexts/theme-context'

interface AllProvidersProps {
  children: ReactNode
}

function AllProviders({ children }: AllProvidersProps) {
  return (
    <ThemeProvider>
      <InternProvider>{children}</InternProvider>
    </ThemeProvider>
  )
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  })
}

export * from '@testing-library/react'
export { customRender as render }