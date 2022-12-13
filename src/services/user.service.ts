import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN = 'loggedInUser'

export const userService = {
   query,
   login,
   signup,
   getLoggedInUser,
}

async function query(filterBy: {} = {}) {
   try {
      return httpService.get('user/', filterBy)
   } catch (err) {
      console.log('Cannot get users ', err)
   }
}

async function login(credentials: {}) {
   try {
      const user = await httpService.post('auth/login', credentials)
      if (user)
         sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
      return user
   } catch (err) {
      console.log('Cannot login', err)
      throw err
   }
}

async function signup(credentials: {}) {
   try {
      const user = await httpService.post('auth/signup', credentials)
      sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
      return user
   } catch (err) {
      console.log('Cannot signup', err)
      throw err
   }
}

function getLoggedInUser() {
   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN) as string)

}

