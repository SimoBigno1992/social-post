// import { atom } from 'jotai'
// import { StoreModel } from '../models'

// const store = atom<Partial<StoreModel>>({})

// export default atom(
//   (get) => get(store),
//   (get, set, update) => {
//     set(store, { ...get(store), ...(update as StoreModel) })
//   }
// )

import { atomWithStorage } from 'jotai/utils';
import { StoreModel } from '../models'

const defaultValue: StoreModel = { user: {
  id: 0,
  name: "",
  email: "",
  status: "",
  gender: ""
}}  
export const user = atomWithStorage('user', defaultValue);
