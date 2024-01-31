import {Dispatch, FC, SetStateAction} from 'react'

export type HomeComponent = {
  id: number
  component: FC<HomeProps>
}

export type HomeProps = {
  screenWidth: number
}
