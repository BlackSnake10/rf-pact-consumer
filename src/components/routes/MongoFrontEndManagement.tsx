/* eslint-disable @typescript-eslint/no-misused-promises */
import { Navigate } from 'react-router-dom'
import { CustomHeader } from '../CustomHeader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AccountCard from '../AccountCard'
import AccountCardDevDebug from '../AccountCardDevDebug'

export interface accountData {
  username: string
  country: string
  personal_data: {
    name: string
    surname: string
  }
  user_id: string
}

export interface accountInputData {
  accountInput: accountData
}

// export function ResultModal ({ result, resetForm }: { result: string[][], resetForm: () => void }): JSX.Element {
export function MongoFrontEndManagement (): JSX.Element {
  const [list, setList] = useState<accountData[] | undefined>()

  useEffect(() => {
    getMongoDBData()
  }, [])

  const getMongoDBData = (): void => {
    void axios.get(`${process.env.VITE_SERVER_API_BASE_URL}/api/v1/accounts`)
      .then(function (response) {
        console.log(response)
        setList(response.data)
      })
  }

  const deleteAccount = (userId: string): void => {
    void axios.delete(`${process.env.VITE_SERVER_API_BASE_URL}/api/v1/account/${userId}`)
      .then(function () {
        getMongoDBData()
      })
  }

  const updateAccount = (account: accountInputData): void => {
    console.log(account)
    void axios.put(`${process.env.VITE_SERVER_API_BASE_URL}/api/v1/account/${account.accountInput.user_id}`, account.accountInput)
      .then(function () {
        getMongoDBData()
      })
  }

  const addAccount = (account: accountInputData): void => {
    console.log(account)
    void axios.post(`${process.env.VITE_SERVER_API_BASE_URL}/api/v1/account`, account)
      .then(function () {
        getMongoDBData()
      })
  }

  return (
    <>

      {process.env.NODE_ENV !== 'development'
        ? <Navigate to='/' replace={true}/>
        : <>
          <CustomHeader subtitle={'MongoDB Front-end Management via API'} />
          <section className='grid w-5/6 grid-cols-3 gap-4 overflow-auto h-[48vh] px-4'>
            {list?.map((account) => (
              <AccountCard
                key={account.user_id}
                initialAccount={account}
                deleteAccount={deleteAccount}
                updateAccount={updateAccount} />
            ))}
            <AccountCardDevDebug
              key={'AccountCardDevDebug'}
              addAccount={addAccount} />
          </section>
          <div className='flex flex-row w-5/6 gap-1 p-3 m-2 transition-all rounded-md justify-evenly bg-neutral-700'>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">cloud</span>{process.env.VITE_SERVER_API_BASE_URL}</p>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">list</span>{list?.length} entries</p>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">api</span>API REST</p>
            <button className='h-6 p-0 m-0 bg-transparent hover:bg-green-900' onClick={getMongoDBData}><span className="material-symbols-rounded text-neutral-100">refresh</span></button>
          </div>
        </>}
    </>

  )
}

export default MongoFrontEndManagement
