import { createContext, useState } from 'react'
import './App.css'

import ResultModal from './components/routes/ResultModal'
import UserForm from './components/routes/UserForm'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import fetch from 'cross-fetch'

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'
import MongoFrontEndManagement from './components/routes/MongoFrontEndManagement'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4010/', fetch }),
  cache: new InMemoryCache()
})

export const DrillContext = createContext<string | null>(null)

export function App (): JSX.Element {
  const [context] = useState('v0.9.7')
  const navigate = useNavigate()
  const location = useLocation()

  const handleDevMode = (e: any): void => {
    e.currentTarget.blur()
    navigate('/mongodb')
  }

  return (
    <>
      <ApolloProvider client={client}>
        <DrillContext.Provider value={context}>
          <main className="flex flex-row items-center justify-center w-screen h-screen">
            <div className="w-0 h-screen css-login-screen md:w-1/2">
              {process.env.NODE_ENV === 'development' && location.pathname !== '/mongodb' &&
                <button data-testid='DEVformAPI' onClick={handleDevMode} className='bg-green-900 m-3.5 flex gap-1' type='button'>
                  <span className="material-symbols-rounded">login</span> Enter MongoDB Management
                </button>
              }
              {process.env.NODE_ENV === 'development' && location.pathname === '/mongodb' &&
                <button data-testid='DEVformReturn' onClick={() => { navigate('/') }} className='bg-red-900 m-3.5 flex gap-1' type='button'>
                  <span className="material-symbols-rounded">logout</span> Leave MongoDB Management
                </button>
              }
            </div>
            <aside className="flex flex-col items-center justify-center w-1/2">
              <Routes>
                <Route path='/' element={<UserForm />} />
                <Route path='/confirm' element={<ResultModal/>} />
                <Route path='/mongodb' element={<MongoFrontEndManagement/>} />
                <Route path='/*' element={<h1 className="font-raleway">404 Not Found</h1>} />
              </Routes>
            </aside>
          </main>
        </DrillContext.Provider>
      </ApolloProvider>
    </>
  )
}

/* istanbul ignore next: false positive on line coverage */
export default App
