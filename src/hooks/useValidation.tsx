import { useState } from "react";
import { Validation } from "../fieldConstraints/formFields";

export function useValidation(constraintArray: Validation[] | undefined) {
    const [watchValues, setWatchValues] = useState(new Map())

    let firstValue
    let secondValue

    function ESdniValidation(input: string) {
        const lastCharacterArray = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
        let validationResult

        if (input.length === 9) {
            const numbers = input.slice(0, 8).replace('X', '1').replace('Y', '2').replace('Z', '3')
            const lastCharacter = input.charAt(8)
            const parsedNumbers = parseInt(numbers)
            if (!isNaN(parsedNumbers)) {
                 
                validationResult = lastCharacter === lastCharacterArray[(parsedNumbers % 23)]
            } else {
                validationResult = false
            }
        } else {
            validationResult = false;
        }
        return validationResult;
    }

    function JPmyNumberValidation(input: string) {
        let validationResult

        if (input.length === 12 && !isNaN(parseInt(input))) {
            const numbers = input.slice(0, 10)
            const lastNumber = parseInt(input.charAt(11))

            let mysum = 0;

            for (let i = 0; i < 5; i++) {
                mysum += parseInt(numbers.charAt(i)) * (11 - i - 5);
            }
            for (let i = 5; i < 10; i++) {
                mysum += parseInt(numbers.charAt(i)) * (11 - i + 1);
            }
            let totalCheckSum = 11 - mysum % 11;
            if (totalCheckSum > 9) { totalCheckSum = 0; }

            validationResult = lastNumber === totalCheckSum
        } else {
            validationResult = false;
        }
        return validationResult;
    }

    function containingValue(firstValue: string, secondValue: string) {
        const secondValueArray = secondValue.split(/[\s-]+/)

        let checkValidationResult = false
        secondValueArray.forEach(element => {
            if (element !== "") {
                checkValidationResult = checkValidationResult || firstValue.includes(element)
            }
        })
        return checkValidationResult
    }

    const checkValidation = (key: string, value: string) => {
        let checkValidationResult: boolean | undefined = undefined
        const errorsArray: string[] = []

        setWatchValues(watchValues.set(key, value.toUpperCase()))

        if (constraintArray !== undefined) {
            constraintArray.forEach(constraint => {
                let errorString = ""
                firstValue = watchValues.get(constraint.firstArgument)
                secondValue = watchValues.get(constraint.secondArgument)
                if (firstValue !== undefined && secondValue !== undefined) {
                    switch (constraint.typeOfValidation) {
                        case 'notContain':
                            errorString = constraint.firstArgumentTag + ' field must not contain ' + constraint.secondArgumentTag + ' field'
                            //negate final result, as it should NOT contain it
                            checkValidationResult = !containingValue(firstValue, secondValue)
                            break;
                        case 'idValidation':
                            errorString = secondValue + ' ID is not valid'
                            switch (secondValue) {
                                case 'SPAIN':
                                    checkValidationResult = ESdniValidation(firstValue);
                                    break;
                                case 'JAPAN':
                                    checkValidationResult = JPmyNumberValidation(firstValue);
                                    break;
                                /* istanbul ignore next: failsafe for unknown country */
                                default:
                                    console.warn('[idValidation] - There is no ID validation data for ' + secondValue + '!')
                                    break;
                            }
                            break;
                        /* istanbul ignore next: failsafe for unknown type of validation */
                        default:
                            console.warn('[useValidation] - The validation ' + constraint.typeOfValidation + ' does not exist!')
                            break;
                    }

                    if (!checkValidationResult) {
                        errorsArray.push(errorString)
                    } else {
                        errorsArray.filter(e => e !== errorString)
                    }

                }
            });
        }

        return errorsArray
    }



    return { checkValidation }
}