import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
   query,
}

async function query() {
   try {
      return httpService.get(BASE_URL)
   } catch (err) {
      console.log('Cannot get code blocks', err)
   }
}
