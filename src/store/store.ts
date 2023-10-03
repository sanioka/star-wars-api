import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension' // required for devtools typing
import { IPeople } from '../api/IStarWars'
import omit from 'lodash-es/omit'

export const useCharacterStore = create<CharacterStore>()(
  devtools(
    persist(
      (set, get) => ({
        data: {},
        changeData: (id: string, newItem: IPeople) => {
          set(() => ({ data: { ...get().data, [id]: newItem } }))
        },
        deleteData: (id: string) => {
          set(() => ({ data: omit(get().data, [id]) }))
        },
      }),
      {
        name: 'character-storage',
        version: 1,
      },
    ),
  ),
)

type CharacterStore = {
  data: {
    [key: string]: IPeople
  }
  changeData: any // TODO: improve TS
  deleteData: any
}
