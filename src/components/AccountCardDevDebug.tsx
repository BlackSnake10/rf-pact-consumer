/* eslint-disable @typescript-eslint/no-misused-promises */

import { useState } from 'react'
import { type accountInputData } from './routes/MongoFrontEndManagement'
import { accountInputObject } from './routes/ResultModal'

export function AccountCardDevDebug ({ addAccount }: { addAccount: (account: accountInputData) => void }): JSX.Element {
  const [editMode, setEditMode] = useState<boolean>(false)

  const handleAdd = (event: any): void => {
    event.preventDefault()
    // console.log(accountData.current)
    const fields = Object.fromEntries(new window.FormData(event.target))
    const dataMap = Object.entries(fields) as string[][]
    if (dataMap.length !== 0) {
      const accountToUpdate = accountInputObject(dataMap)
      addAccount(accountToUpdate)
      setEditMode(!editMode)
    }
  }

  const handleEdit = (event: any): void => {
    event.preventDefault()
    setEditMode(!editMode)
  }

  return (
    <>
      <form className='flex flex-col w-full h-full min-w-full gap-1 p-3 transition-all rounded-md bg-neutral-700' onSubmit={handleAdd}>
        {editMode
          ? <>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">account_circle</span> <input type="text" name="username" className='w-full bg-inherit'/></p>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">person</span> <input type="text" name="name" className='w-full bg-inherit'/></p>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">group</span> <input type="text" name="surname" className='w-full bg-inherit'/></p>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">language</span>  <input type="text" name="country" className='w-full bg-inherit'/></p>
            <p className='flex gap-2'><span className="material-symbols-rounded text-neutral-100">badge</span>  <input type="text" name="user_id" className='w-full bg-inherit'/></p>

            <div className='grid grid-flow-col grid-cols-2 gap-1 mt-2 font-raleway'>

              <button className='flex items-center p-0 text-xs transition-all bg-blue-600 justify-evenly hover:bg-red-600' onClick={handleEdit}><span className="text-base material-symbols-rounded text-neutral-100">cancel</span>Cancel
              </button>
              <button className='flex items-center p-0 text-xs transition-all bg-blue-600 justify-evenly hover:bg-green-600' type="submit"><span className="text-base material-symbols-rounded text-neutral-100">save</span>Add
              </button>

            </div>
          </>
          : <button className='flex items-center w-full h-full p-0 text-lg transition-all bg-neutral-900 justify-evenly hover:bg-neutral-600' onClick={handleEdit}><span className="material-symbols-rounded text-neutral-100">add_circle</span>Manual POST
          </button>}
      </form>
    </>

  )
}

export default AccountCardDevDebug
