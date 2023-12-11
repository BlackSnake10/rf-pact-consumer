/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react'
import { type accountData, type accountInputData } from './routes/MongoFrontEndManagement'
import { accountInputObject } from './routes/ResultModal'

export function AccountCard ({ initialAccount, deleteAccount, updateAccount }: { initialAccount: accountData, deleteAccount: (string: string) => void, updateAccount: (account: accountInputData) => void }): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleDelete = (userId: string): void => {
    deleteAccount(userId)
  }

  const handleUpdate = (event: any): void => {
    event.preventDefault()
    // console.log(accountData.current)
    const fields = Object.fromEntries(new window.FormData(event.target))
    const dataMap = Object.entries(fields) as string[][]
    if (dataMap.length !== 0) {
      const accountToUpdate = accountInputObject(dataMap)
      updateAccount(accountToUpdate)
      setEditMode(!editMode)
    }
  }

  const handleEdit = (event: any): void => {
    event.preventDefault()
    setEditMode(!editMode)
  }

  return (
    <>
      <form className={'flex flex-col w-full gap-1 p-3 rounded-md h-min transition-all ' + (editMode ? 'bg-blue-900' : 'bg-neutral-700')} onSubmit={handleUpdate}>
        <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">account_circle</span>{editMode ? <input defaultValue={initialAccount.username} type="text" name="username" className='w-full bg-inherit'/> : initialAccount.username}</p>
        <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">person</span> {editMode ? <input defaultValue={initialAccount.personal_data.name} type="text" name="name" className='w-full bg-inherit'/> : initialAccount.personal_data.name}</p>
        <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">group</span> {editMode ? <input defaultValue={initialAccount.personal_data.surname} type="text" name="surname" className='w-full bg-inherit'/> : initialAccount.personal_data.surname}</p>
        <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">language</span> {editMode ? <input defaultValue={initialAccount.country} type="text" name="country" className='w-full bg-inherit'/> : initialAccount.country}</p>
        <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">badge</span><span className='font-medium text-neutral-400'>{initialAccount.user_id}</span></p>
        <div className='grid grid-flow-col grid-cols-2 gap-1 mt-2 font-raleway'>
          {editMode
            ? <>
              <button className='flex items-center p-0 text-xs transition-all bg-blue-600 justify-evenly hover:bg-red-600' onClick={handleEdit}><span className="text-base material-symbols-rounded text-neutral-100">cancel</span>Cancel
              </button>
              <button className='flex items-center p-0 text-xs transition-all bg-blue-600 justify-evenly hover:bg-green-600' type="submit"><span className="text-base material-symbols-rounded text-neutral-100">save</span>Save changes
              </button>
            </>
            : <>
              <button className='flex items-center p-0 text-xs transition-all justify-evenly hover:bg-red-600' onClick={() => { handleDelete(initialAccount.user_id) }}><span className="text-base material-symbols-rounded text-neutral-100">delete</span>Delete
              </button>
              <button className='flex items-center p-0 text-xs transition-all justify-evenly hover:bg-neutral-600' onClick={handleEdit}><span className="text-base material-symbols-rounded text-neutral-100">edit</span>Edit
              </button>
            </>}
        </div>
      </form>
    </>

  )
}

export default AccountCard
