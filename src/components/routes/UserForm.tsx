import { useState, useEffect } from 'react'
import ValidatedInputField from '../ValidatedInputField'
import PredefinedSelectField from '../PredefinedSelectField'
import { crossValidations } from '../../fieldConstraints/formFields'
import { useValidation } from '../../hooks/useValidation'
import { FormButtons } from '../FormButtons'
import { ConstraintErrorWarning } from '../ConstraintErrorWarning'
import { CustomHeader } from '../CustomHeader'

import { useNavigate } from 'react-router-dom' // RRDv6

export function UserForm (): JSX.Element {
  const countries = ['Spain', 'Japan']
  const formFields = ['user', 'name', 'surname', 'country', 'user_id']
  const navigate = useNavigate() // RRDv6

  const initCompleteFields = (): Map<string, boolean> => {
    const fieldMap = new Map()
    formFields.forEach(element => {
      fieldMap.set(element, false)
    })
    return fieldMap
  }

  const [toBeCleared, setClear] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(true)
  const [constraintErrorArray, setConstraintErrorArray] = useState<string[]>([])
  const [completeFields, setCompleteFields] = useState(
    initCompleteFields()
  )
  const { checkValidation } = useValidation(crossValidations)

  useEffect(() => {
    let isAllFieldsComplete = true
    completeFields.forEach(fieldCompleted => {
      isAllFieldsComplete = isAllFieldsComplete && fieldCompleted
    })
    const isCompleteNoErrors = isAllFieldsComplete && constraintErrorArray.length === 0
    setDisableSubmit(!isCompleteNoErrors)
  }, [constraintErrorArray, completeFields])

  const constraintCheck = (fieldName: string, fieldValue: string): void => {
    const newConstraintError = checkValidation(fieldName, fieldValue)
    setConstraintErrorArray(newConstraintError)
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    const fields = Object.fromEntries(new window.FormData(event.target))
    const dataMap = Object.entries(fields)
    navigate('/confirm', {
      state: dataMap
    })
  }

  const handleClear = (): void => {
    setClear(!toBeCleared)
    setConstraintErrorArray([])
    setDisableSubmit(true)
    setCompleteFields(initCompleteFields())
  }

  const allowSubmit = (key: string, newValue: boolean): void => {
    const newStateFields = new Map([...completeFields])
    newStateFields.set(key, newValue)
    setCompleteFields(newStateFields)
  }

  return (
    <>
      <ConstraintErrorWarning constraintError={constraintErrorArray} />

      <CustomHeader subtitle={'Please, enter your data:'} />

      <form data-testid="signupForm" className="font-raleway grid grid-cols-[auto_auto] items-center md:w-3/5 gap-3" onSubmit={handleSubmit}>

        <ValidatedInputField fieldName='user'
          materialIcon='account_circle'
          fieldLabel="Username"
          isSpaceAllowed={false}
          initialToBeCleared={toBeCleared}
          maxDigits={10}
          requirementFn={allowSubmit}
          constraintFn={constraintCheck}/>

        <ValidatedInputField fieldName='name'
          materialIcon='person'
          fieldLabel="Name"
          isNumberAllowed={false}
          initialToBeCleared={toBeCleared}
          requirementFn={allowSubmit}
          constraintFn={constraintCheck} />

        <ValidatedInputField fieldName='surname'
          materialIcon='group'
          fieldLabel="Surname"
          isNumberAllowed={false}
          initialToBeCleared={toBeCleared}
          requirementFn={allowSubmit} />

        <PredefinedSelectField fieldName='country'
          materialIcon='language'
          fieldLabel="Country"
          selectList={countries}
          selectionPlaceholder="SELECT COUNTRY"
          initialToBeCleared={toBeCleared}
          requirementFn={allowSubmit}
          constraintFn={constraintCheck} />

        <ValidatedInputField fieldName='user_id'
          materialIcon='badge'
          fieldLabel="ID"
          isSpaceAllowed={false}
          initialToBeCleared={toBeCleared}
          requirementFn={allowSubmit}
          constraintFn={constraintCheck} />

        <FormButtons disableSubmit={disableSubmit}
          handleClear={handleClear} />
      </form>

    </>
  )
}

export default UserForm
