import { ChangeEvent } from 'react'
import { useMutation } from 'react-query'
import { supabase } from '../utils/supabase'
import useStore from '../store'

export const useUploadPostImg = () => {
  const editedPost = useStore((state) => state.editedPost)
  const updatePost = useStore((state) => state.updateEditedPost)
  const useMutateUploadPostImg = useMutation(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select the image file')
      }
      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`
      const { error } = await supabase.storage
        .from('posts')
        .upload(filePath, file)
      if (error) throw new Error(error.message)
      updatePost({ ...editedPost, post_url: filePath })
    },
    {
      onError: (err: any) => {
        alert(err.message)
      },
    }
  )
  return { useMutateUploadPostImg }
}
