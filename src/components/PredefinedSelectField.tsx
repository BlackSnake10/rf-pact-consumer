import { useState, useEffect, useId } from 'react'

export default function PredefinedSelectField ({ fieldName, materialIcon, fieldLabel, selectList, selectionPlaceholder, initialToBeCleared, requirementFn, constraintFn }: { fieldName: string, materialIcon?: string, fieldLabel: string, selectList: string[], selectionPlaceholder: string, initialToBeCleared: boolean, requirementFn?: (arg0: string, arg1: boolean) => void, constraintFn?: (arg0: string, arg1: string) => void }): JSX.Element {
  const [selectValue, setSelectValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const fieldID = useId()

  useEffect(() => {
    setSelectValue(selectionPlaceholder)
    if (requirementFn !== undefined) {
      requirementFn(fieldName, false)
    }
  }, [initialToBeCleared])

  const handleClickAndFocus = (event: any): void => {
    if (requirementFn !== undefined) {
      let allowSubmitStatus

      if (event.target.value !== selectionPlaceholder) {
        setError(null)
        allowSubmitStatus = true
      } else {
        setError('This field is required')
        allowSubmitStatus = false
      }

      requirementFn(fieldName, allowSubmitStatus)
    }
  }

  const handleChange = (event: any): void => {
    // remove error when changing from placeholder to other value (once)
    if (requirementFn !== undefined && selectValue === selectionPlaceholder) {
      setError(null)
      requirementFn(fieldName, true)
    }

    const newValue = event.target.value
    setSelectValue(newValue)
    if (constraintFn !== undefined) {
      constraintFn(fieldName, newValue)
    }
  }

  return (
    <>
      {(fieldLabel !== '') &&
            <div className='flex items-center gap-2 place-content-start'>
              {(materialIcon !== '') && <span className="material-symbols-rounded text-neutral-500">{materialIcon}</span>}
              <label htmlFor={fieldID}>{fieldLabel}</label>
            </div>
      }
      <div className="flex flex-col">
        <select data-testid={fieldName} value={selectValue} name={fieldName} id={fieldID} autoComplete="off"
          onClick={handleClickAndFocus} onFocus={handleClickAndFocus} onChange={handleChange}
          className={'uppercase styled-select' + (error !== null ? ' error' : '')}>
          <option hidden>{selectionPlaceholder}</option>
          {selectList.map((selectElement: string) => (
            <option key={selectElement} value={selectElement}>{selectElement}</option>
          ))}
        </select>

        {error !== null &&
                    <span data-testid={fieldName + 'ValidationMsg'}
                      className="validation-warning"
                    >{error}</span>
        }
      </div>
    </>

  )
}
