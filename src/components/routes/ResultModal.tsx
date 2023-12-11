/* eslint-disable @typescript-eslint/no-misused-promises */
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { CustomHeader } from '../CustomHeader'
import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'
import axios, { type AxiosStatic } from 'axios'
import { type accountInputData } from './MongoFrontEndManagement'

export const axiosUpload = async (endpoint: any): Promise<AxiosStatic> => {
  const url = endpoint.url
  const data = accountInputObject(endpoint.data)
  console.log(data)

  return await axios.post(`${url}/api/v1/account`, data)
    .then((response) => response.data)
}

export function accountInputObject (result: string[][]): accountInputData {
  return {
    accountInput: {
      username: result[0][1],
      country: result[3][1],
      personal_data: {
        name: result[1][1],
        surname: result[2][1]
      },
      user_id: result[4][1]
    }
  }
}

// export function ResultModal ({ result, resetForm }: { result: string[][], resetForm: () => void }): JSX.Element {
export function ResultModal (): JSX.Element {
  /* istanbul ignore next: placeholder alert */
  const location = useLocation()
  const navigate = useNavigate() // RRDv6
  const result: string[][] = location.state
  const [framework, setFramework] = useState<string>('apollo')
  const [load, setLoad] = useState<boolean>(false)

  // Apollo Server + GraphQL
  const addAccount = gql`
  mutation Mutation($accountInput: AccountInput!) {
    addAccount(AccountInput: $accountInput) {
      username
      user_id
      country
      personal_data {
        name
        surname
      }
    }
  }
  `
  const [uploadAccount, { loading }] = useMutation(addAccount)

  const handleUploadFramework = (originButton: string): void => {
    if (originButton === 'apollo') {
      setFramework('apollo')
    } else {
      setFramework('spring')
    }
  }

  const handleYes = async (e: any): Promise<void> => {
    e.target.blur()

    if (framework === 'apollo') {
      try {
        await uploadAccount({
          variables: accountInputObject(result)
        })
        alert('Data uploaded via Apollo Server')
        navigate('/')
      } catch (error) {
        alert(error)
      }
    } else {
      setLoad(true)
      axiosUpload({ url: process.env.VITE_SERVER_API_BASE_URL, data: result })
        .then(function (response) {
          console.log(response)
          alert('Data uploaded via API')
          navigate('/')
        })
        .catch(error => {
          alert(error)
          setLoad(false)
        })
    }
  }

  const handleNo = (): void => {
    navigate('/')
  }

  return (
    <>

      {result === null
        ? <Navigate to='/' replace={true}/>
        : <>
          <CustomHeader subtitle={'You will register to MinesweepeReact with this data. Is this correct?'} />
          <section className="grid items-center grid-cols-[40%_60%] gap-3 w-full p-3 font-raleway md:w-3/5 bg-neutral-900 rounded-md ">
            <p>Username: </p>
            <strong data-testid="userSubmit">{result[0][1]}</strong>
            <p>Name: </p>
            <strong data-testid="nameSubmit">{result[1][1]}</strong>
            <p>Surname: </p>
            <strong data-testid="surnameSubmit">{result[2][1]}</strong>
            <p>Country: </p>
            <strong data-testid="countrySubmit">{result[3][1]}</strong>
            <p>ID: </p>
            <strong data-testid="user_idSubmit">{result[4][1]}</strong>
          </section>

          { (load || loading)
            ? <div className='grid w-3/5 grid-cols-2 col-span-2 gap-3 p-1.5 mt-12 rounded-md bg-neutral-900'>
              <div className='col-span-2 m-0.5 w-7 justify-self-center bg-neutral-300 loader'/>
            </div>
            : <>
              <div className="grid w-3/5 grid-cols-2 col-span-2 gap-3 mt-12">
                <button data-testid='formAccept' className="flex items-center place-content-evenly font-raleway bg-neutral-700 enabled:bg-neutral-900 enabled:hover:bg-green-900 enabled:hover:font-bold enabled:focus:bg-green-900 enabled:focus:font-bold" type='button' onClick={handleYes}>
                  <span className="material-symbols-rounded">done</span> Yes
                </button>
                <button data-testid='formRestart' className="flex items-center place-content-evenly font-raleway bg-neutral-700 enabled:bg-neutral-900 enabled:hover:bg-red-900 enabled:hover:font-bold enabled:focus:bg-red-900 enabled:focus:font-bold" type="button" onClick={handleNo}>
                  <span className="material-symbols-rounded">close</span> No
                </button>
              </div>
            </>}
          {process.env.NODE_ENV === 'development' &&
                    <div className="grid w-3/5 grid-cols-2 col-span-2 gap-3 mt-5 rounded-md bg-neutral-600" >
                      <button data-testid='DEVformApollo' className={framework === 'apollo' ? 'option-chosen' : 'option-excluded'} type='button' onClick={() => { handleUploadFramework('apollo') }} disabled={(load || loading)}>
                        <span className="material-symbols-rounded">database</span> Apollo+GraphQL
                      </button>
                      <button data-testid='DEVformAPI' className={framework === 'spring' ? 'option-chosen' : 'option-excluded'} type="button" onClick={() => { handleUploadFramework('spring') }} disabled={(load || loading)}>
                        <span className="material-symbols-rounded">api</span> API REST
                      </button>
                    </div>
          }

        </>}
    </>

  )
}

export default ResultModal
