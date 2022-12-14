import { Session } from 'models/session.interface'
import { httpService } from './http.service'

const BASE_URL = `session/`

export const sessionService = {
    add
}

async function add(session: Session) {
    try {
        return httpService.post(BASE_URL, session)
    } catch (err) {
        console.log('Cannot create session', err)
    }
}
