import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedPost, EditedProfile, EditedNotice } from '../types'

type State = {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
  editedNotice: EditedNotice
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedNotice: () => void
  editedPost: EditedPost
  updateEditedPost: (payload: EditedPost) => void
  resetEditedPost: () => void
}
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedProfile: { username: '', favorites: '', avatar_url: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        favorites: payload.favorites,
        avatar_url: payload.avatar_url,
      },
    }),
  resetEditedProfile: () =>
    set({ editedProfile: { username: '', favorites: '', avatar_url: '' } }),
  editedNotice: { id: '', content: '' },
  updateEditedNotice: (payload) =>
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),
  editedPost: { id: '', title: '', post_url: '' },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        id: payload.id,
        title: payload.title,
        post_url: payload.post_url,
      },
    }),
  resetEditedPost: () =>
    set({ editedPost: { id: '', title: '', post_url: '' } }),
}))

export default useStore
