import {DefaultEventsMap} from '@socket.io/component-emitter'
import {Dispatch, FC, SetStateAction, createContext, useContext, useState} from 'react'
import {io, Socket} from 'socket.io-client'
import {WithChildren} from '../types'
import Cookies from 'js-cookie'

export type SocketCustom = Socket<DefaultEventsMap, DefaultEventsMap> | null

type SocketContextProps = {
  socket: SocketCustom
  setSocket: Dispatch<SetStateAction<SocketCustom>>
  setupSocket: (company_id) => void
}

const initSocketContextPropsState = {
  socket: null,
  setSocket: () => {},
  setupSocket: () => {},
}

const SocketContext = createContext<SocketContextProps>(initSocketContextPropsState)

const useSocket = () => {
  return useContext(SocketContext)
}

const SocketProvider: FC<WithChildren> = ({children}) => {
  const [socket, setSocket] = useState<SocketCustom>(null)

  function setupSocket(company_id: number) {
    const token = Cookies.get('token')

    if (token && company_id && !socket) {
      const newSocket = io(import.meta.env.VITE_REACT_APP_URL, {
        autoConnect: false,
        query: {
          token,
          company_id,
        },
      })

      newSocket.on('connect', () => {
        import.meta.env.NODE_ENV !== 'production' && console.log('Socket connect success!')
      })

      newSocket.on('disconnect', () => {
        setSocket(null)
        setTimeout(setupSocket, 3000)
      })

      setSocket(newSocket)
      newSocket.connect() // Thử kết nối một cách rõ ràng
    }
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        setupSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export {SocketProvider, useSocket}
