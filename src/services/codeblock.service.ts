import { httpService } from './http.service'

const BASE_URL = `codeblock/`

export const codeblockService = {
   query,
   getById,
   update
}

async function query() {
   try {
      return httpService.get(BASE_URL)
   } catch (err) {
      console.log('Cannot get code blocks', err)
   }
}

async function getById(codeblockId: string) {
   try {
      return httpService.get(BASE_URL + codeblockId)
   } catch (err) {
      console.log('Cannot get code block', err)
   }
}

async function update(codeblock: { _id: string, code: string }) {
   try {
      return httpService.put(BASE_URL + codeblock._id, codeblock)
   } catch (err) {
      console.log('Cannot update code block', err)
   }
}
