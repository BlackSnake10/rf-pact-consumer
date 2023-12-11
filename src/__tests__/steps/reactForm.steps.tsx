/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react'
import { App } from '../../App.tsx'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { expect } from '@jest/globals'
import { BrowserRouter } from 'react-router-dom'

export const reactFormSteps = ({
  given: Given,
  when: When,
  then: Then
}: {
  given: any
  when: any
  then: any
}): void => {
  // Necessary when using React-router tests
  const renderWithRouter = (ui: any, { route = '/' } = {}): any => {
    window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent.setup(),
      ...render(ui, { wrapper: BrowserRouter })
    }
  }

  Given('the user opens the app', () => {
    renderWithRouter(<App />, { route: '/' })
  })

  When(/^the user clicks the "(.*)" input$/, async (string: string) => {
    const selectedInput = screen.getByTestId(string)
    await userEvent.click(selectedInput)
  })

  When(/^the user writes "(.*)" in the input "(.*)"$/, async (inputText: string, elementId: string) => {
    const inputTextField = screen.getByTestId(elementId)
    await userEvent.type(inputTextField, inputText)
  })

  When(/^the user clears the input "(.*)"$/, async (elementId: string) => {
    const inputTextField = screen.getByTestId(elementId)
    await userEvent.clear(inputTextField)
  })

  When(/^the user clicks the "(.*)" button$/, async (elementId: string) => {
    const selectedButton = screen.getByTestId(elementId)
    await userEvent.click(selectedButton)
  })

  When(/^the user clicks the "(.*)" field$/, async (elementId: string) => {
    const selectedField = screen.getByTestId(elementId)
    await userEvent.click(selectedField)
  })

  When(/^the user selects the (\d+) option in the "(.*)" select field$/, async (option: number, select: string) => {
    const element = screen.getByTestId(select)
    const selectOption = element.children[option] as HTMLElement
    await userEvent.selectOptions(element, selectOption)
  })

  Then(/^the subtitle should show: "(.*)"$/, (expectedInner: unknown) => {
    const subtitleInner = screen.getByTestId('subtitle').innerHTML
    expect(subtitleInner).toBe(expectedInner)
  })

  Then(/^the "(.*)" select field should show: "(.*)"$/, (elementId: string, expectedInner: string) => {
    const selectInner = (screen.getByTestId(elementId) as HTMLSelectElement).value
    expect(selectInner).toBe(expectedInner)
  })

  Then(/^the "(.*)" validation error should show: "(.*)"$/, (elementId: string, expectedInner: string) => {
    const titleInner = screen.getByTestId(elementId + 'ValidationMsg').innerHTML
    expect(titleInner).toBe(expectedInner)
  })

  Then(/^the "(.*)" validation error should not show$/, (elementId: string) => {
    const titleInner = screen.queryByTestId(elementId + 'ValidationMsg')
    expect(titleInner).toBe(null)
  })

  Then(/^the "(.*)" input should be empty$/, (elementId: string) => {
    const titleInner = screen.getByTestId(elementId).innerHTML
    expect(titleInner).toBe('')
  })

  Then(/^the "(.*)" button should be disabled$/, (elementId: string) => {
    const element = screen.getByTestId(elementId) as HTMLButtonElement
    expect(element.disabled).toBe(true)
  })

  Then(/^the "(.*)" button should be enabled$/, (elementId: string) => {
    const element = screen.getByTestId(elementId) as HTMLButtonElement
    expect(element.disabled).toBe(false)
  })

  Then(/^the "(.*)" field should show: "(.*)"$/, (elementId: string, expectedInner: string) => {
    const elementValue = (screen.getByTestId(elementId) as HTMLInputElement).value
    expect(elementValue).toBe(expectedInner)
  })

  Then(/^the "(.*)" submitted field should show: "(.*)"$/, (elementId: string, expectedInner: string) => {
    const elementValue = screen.getByTestId(elementId + 'Submit').innerHTML
    expect(elementValue).toBe(expectedInner)
  })

  Then(/^the "(.*)" input should show: "(.*)"$/, (elementId: string, expectedInner: string) => {
    const elementValue = (screen.getByTestId(elementId) as HTMLInputElement).value
    expect(elementValue).toBe(expectedInner)
  })

  Then(/^the "(.*)" text should show: "(.*)"$/, (elementId: string, expectedInner: string) => {
    const elementValue = screen.getByTestId(elementId).innerHTML
    expect(elementValue).toBe(expectedInner)
  })

  Then(/^the constraint error should show: "(.*)"$/, (expectedInner: string) => {
    const elementValue = screen.getByTestId('constraintError').innerHTML
    expect(elementValue).toBe(expectedInner)
  })

  Then(/^one constraint error should be: "(.*)"$/, (expectedInner: string) => {
    const elementValueArray = screen.getAllByTestId('constraintError')
    const rawValues: string[] = []
    // Get innerHTML from each HTMLElement value
    for (let index = 0; index < elementValueArray.length; index++) {
      rawValues.push(elementValueArray[index].innerHTML)
    }
    expect(rawValues).toContain(expectedInner)
  })
}

export default reactFormSteps
