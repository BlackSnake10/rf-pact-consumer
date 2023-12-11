export const crossValidations = [
    {
        firstArgument: 'user',
        firstArgumentTag: 'Username',
        typeOfValidation: 'notContain',
        secondArgument: 'name',
        secondArgumentTag: 'Name'
    },
    {
        firstArgument: 'user_id',
        firstArgumentTag: 'ID',
        typeOfValidation: 'idValidation',
        secondArgument: 'country',
        secondArgumentTag: 'Country'
    },
]

export type Validation = {
    firstArgument: string,
    firstArgumentTag: string,
    typeOfValidation: string,
    secondArgument: string,
    secondArgumentTag: string
}