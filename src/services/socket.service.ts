import { Codeblock } from 'models/codeblock.interface'
import io, { Socket } from 'socket.io-client'
import { userService } from './user.service'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  let socket: Socket

  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedInUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName: string, cb: (updatedCodeblock: Codeblock) => void) {
      socket.on(eventName, cb)
    },
    emit(eventName: string, data: Object) {
      socket.emit(eventName, data)
    },
    login(userId: string) {
      socket.emit('set-user-socket', userId)
    },
  }

  return socketService
}
