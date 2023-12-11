import { useState, useEffect, useId } from 'react'
// import debounce from "just-debounce-it"

export default function ValidatedInputField ({ materialIcon, fieldName, fieldLabel, isNumberAllowed = true, isSpaceAllowed = true, maxDigits = undefined, initialToBeCleared, requirementFn, constraintFn }: { materialIcon?: string, fieldName: string, fieldLabel: string, isNumberAllowed?: boolean, isSpaceAllowed?: boolean, maxDigits?: number | undefined, initialToBeCleared: boolean, requirementFn?: (arg0: string, arg1: boolean) => void, constraintFn?: (arg0: string, arg1: string) => void }): JSX.Element {
  const [input, setInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const fieldID = useId()

  useEffect(() => {
    resetValue()
  }, [initialToBeCleared])

  const handleClickAndFocus = (event: any): void => {
    if (requirementFn !== undefined) {
      let allowSubmitStatus

      if (event.target.value !== '') {
        setError(null)
        allowSubmitStatus = true
      } else {
        setError('This field is required')
        allowSubmitStatus = false
      }

      requirementFn(fieldName, allowSubmitStatus)
    }
  }

  // const debounceConst = useCallback(debounce((fieldName, input) => {
  //     constraintFn(fieldName, input)
  // }, 500), [])
  //
  // comentado en el caso que se quiera hacer un debounce de medio segundo

  const handleChange = (event: any): void => {
    const currentInputField = event.target.value
    const isChangeAllowed = allowNewChange(currentInputField, isNumberAllowed, isSpaceAllowed)
    let allowSubmitStatus = false

    if (isChangeAllowed && currentInputField !== ' ') {
      if (currentInputField !== null && currentInputField !== '') {
        setInput(currentInputField.toUpperCase())
        setError(null)
        allowSubmitStatus = true
        if (constraintFn !== undefined) {
          // debounceConst(fieldName, currentInputField)
          constraintFn(fieldName, currentInputField)
        }
      } else {
        if (currentInputField === '') setInput('') // edge case where full input is manually deleted
        setError('This field is required')
        allowSubmitStatus = false
      }
    }

    if (requirementFn !== undefined) {
      requirementFn(fieldName, allowSubmitStatus)
    }
  }

  const resetValue = (): void => {
    setInput('')
  }

  const allowNewChange = (currentInputField: string, isNumberAllowed: boolean, isSpaceAllowed: boolean): boolean => {
    const addedValueSpace = currentInputField.endsWith(' ')
    const addedValueNumber = parseInt(currentInputField.charAt(currentInputField.length - 1))

    if ((!isNumberAllowed && !isNaN(addedValueNumber)) || (!isSpaceAllowed && addedValueSpace)) {
      return false
    } else {
      return true
    }
  }

  // onBlur={handleOutFocus}? Usarlo para que compruebe cada vez que haga tabulacion porque es una form?
  //
  // const handleOutFocus = () => {
  //     console.log('This runs when the input is out of focus')
  // }

  // autoComplete off to ensure security reasons
  // name => para recojer datos de la form
  // id => para vincular label y input (accesibilidad)

  return (
    <>
      {(fieldLabel !== '') &&
            <div className='flex items-center gap-2 place-content-start'>
              {(materialIcon !== '') && <span className="material-symbols-rounded text-neutral-500">{materialIcon}</span>}
              <label htmlFor={fieldID}>{fieldLabel}</label>
            </div>
      }
      <div className="flex flex-col">
        <input data-testid={fieldName} value={input} name={fieldName} id={fieldID} autoComplete="off"
          onClick={handleClickAndFocus} onFocus={handleClickAndFocus} onChange={handleChange} maxLength={maxDigits}
          className={'uppercase styled-input' + (error !== null ? ' error' : '')}></input>
        {error !== null &&
                    <span data-testid={fieldName + 'ValidationMsg'}
                      className="validation-warning"
                    >{error}</span>
        }
      </div>
    </>
  )
}
