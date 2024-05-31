import { atom } from 'jotai'
import { StoreModel } from '../models'

const store = atom<Partial<StoreModel>>({})

export default atom(
  (get) => get(store),
  (get, set, update) => {
    set(store, { ...get(store), ...(update as StoreModel) })
  }
)