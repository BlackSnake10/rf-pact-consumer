
'use strict'
import {  accountInputObject, axiosUpload } from '../../components/routes/ResultModal'
import { pactWith } from 'jest-pact'
import axios from 'axios'

const mockSendingObject = 
  [['username', 'USER'], ['name', 'NAME'], ['surname', 'SURNAME'], ['country', 'MOCKUP_COUNTRY'], ['user_id', 'MOCKUP_TEST_PACT']]

const mockExpectingObject = {
    accountInput: {
      username: 'USER',
      country: 'MOCKUP_COUNTRY',
      personal_data: {
        name: 'NAME',
        surname: 'SURNAME'
      },
      user_id: 'MOCKUP_TEST_PACT'
    }
  }

pactWith(
  {
    consumer: 'MinesweepeReact-TS',
    provider: 'SpringAPI-MongoDB',
    logLevel: 'info',
  },
  (provider) => {
    //------------------------------------- PACT POST
    describe('1. -- POST --', () => {

      const successResponse = {
        status: 202,
        headers: {
          'Content-Type': 'application/json'
        },
        body: accountInputObject(mockSendingObject).accountInput
      }

      const listRequest = {
        uponReceiving: 'a request for account posting',
        withRequest: {
          method: 'POST',
          path: '/api/v1/account',
          body: accountInputObject(mockSendingObject),
          headers: {
            Accept: ['application/json','text/plain','*/*']
          }
        }
      }

      beforeEach(() => {
        const interaction = {
          state: 'I want to add a new account',
          ...listRequest,
          willRespondWith: successResponse
        }
        return provider.addInteraction(interaction)
      })

      // add expectations
      it('returns the expected response', async () => {
        await axiosUpload({
          url: provider.mockService.baseUrl,
          data: mockSendingObject
        }).then((accounts) => {
          expect(accounts).toEqual(mockExpectingObject.accountInput)
        })
      })
    });
    //------------------------------------- PACT DELETE
    describe('2. -- DELETE --', () => {

      const successResponse = {
        status: 200,
        headers: {
          'Content-Type': 'text/plain'
        },
        body: "User deleted"
      }

      const listRequest = {
        uponReceiving: 'a request for account deletion',
        withRequest: {
          method: 'DELETE',
          path: '/api/v1/account/' + mockExpectingObject.accountInput.user_id
        }
      }

      beforeEach(() => {
        const interaction = {
          state: 'I delete an account',
          ...listRequest,
          willRespondWith: successResponse
        }
        return provider.addInteraction(interaction)
      })

      // add expectations
      it('returns the expected response', async () => {
        await axios.delete(`${provider.mockService.baseUrl}/api/v1/account/${mockExpectingObject.accountInput.user_id}`).then((response) => {
          expect(response.data).toEqual("User deleted")
        })
      })
    })
    //------------------------------------- PACT POST
    describe('3. -- GET --', () => {

      const successResponse = {
        status: 200,
        body: mockExpectingObject.accountInput
      }

      const listRequest = {
        uponReceiving: 'a request for account information',
        withRequest: {
          method: 'GET',
          path: '/api/v1/account/' + mockExpectingObject.accountInput.user_id
        }
      }

      beforeEach(() => {
        const interaction = {
          state: 'I search for an account',
          ...listRequest,
          willRespondWith: successResponse
        }
        return provider.addInteraction(interaction)
      })

      // add expectations
      it('returns the expected response', async () => {
        await axios.get(`${provider.mockService.baseUrl}/api/v1/account/${mockExpectingObject.accountInput.user_id}`).then((response) => {
          expect(response.data).toEqual(mockExpectingObject.accountInput)
        })
      })
    })
  }
)
