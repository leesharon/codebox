import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
   query,
   login,
   getLoggedInUser
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

function getLoggedInUser() {
   const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)
   if (user) return JSON.parse(user)
}