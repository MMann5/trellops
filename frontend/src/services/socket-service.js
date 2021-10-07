import io from 'socket.io-client'
import { httpService } from './http.service'
const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'//is this our backend port?
export const socketService = createSocketService()


var socketIsReady = false; //in my code this is commented and there is socketService.setup()

function createSocketService() {
  var socket = null;
  const socketService = {
    async setup() {
      if (socket) return
      await httpService.get('setup-session')
      socket = io(baseUrl, { reconnection: false })
      socketIsReady = true;
    },
    async on(eventName, cb) {
      if (!socket) await socketService.setup()
      socket.on(eventName, cb)
    },
    async off(eventName, cb = null) {
      if (!socket) await socketService.setup()
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    async emit(eventName, data) {
      if (!socket) await socketService.setup()
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
      socketIsReady = false
    }
  }
  return socketService
}

