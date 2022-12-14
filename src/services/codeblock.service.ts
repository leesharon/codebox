import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
   query,
   getById
}

async function query() {
   try {
      return httpService.get(BASE_URL)
   } catch (err) {
      console.log('Cannot get code blocks', err)
   }
}

async function getById(codeBlockId: string) {
   try {
      return httpService.get(BASE_URL + codeBlockId)
   } catch (err) {
      console.log('Cannot get code block', err)
   }
}
