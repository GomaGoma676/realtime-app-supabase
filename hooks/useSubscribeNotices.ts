import { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { SupabaseRealtimePayload } from '@supabase/supabase-js'
import { supabase } from '../utils/supabase'
import { Notice } from '../types'

export const useSubscribeNotices = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    const subsc = supabase
      .from('notices')
      .on('INSERT', (payload: SupabaseRealtimePayload<Notice>) => {
        let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (!previousNotices) {
          previousNotices = []
        }
        queryClient.setQueryData(
          ['notices'],
          [
            ...previousNotices,
            {
              id: payload.new.id,
              created_at: payload.new.created_at,
              content: payload.new.content,
              user_id: payload.new.user_id,
            },
          ]
        )
      })
      .on('UPDATE', (payload: SupabaseRealtimePayload<Notice>) => {
        let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (!previousNotices) {
          previousNotices = []
        }
        queryClient.setQueryData(
          ['notices'],
          previousNotices.map((notice) =>
            notice.id === payload.new.id
              ? {
                  id: payload.new.id,
                  created_at: payload.new.created_at,
                  content: payload.new.content,
                  user_id: payload.new.user_id,
                }
              : notice
          )
        )
      })
      .on('DELETE', (payload: SupabaseRealtimePayload<Notice>) => {
        let previousNotices = queryClient.getQueryData<Notice[]>(['notices'])
        if (!previousNotices) {
          previousNotices = []
        }
        queryClient.setQueryData(
          ['notices'],
          previousNotices.filter((notice) => notice.id !== payload.old.id)
        )
      })
      .subscribe()
    const removeSubscription = async () => {
      await supabase.removeSubscription(subsc)
    }
    return () => {
      removeSubscription()
    }
  }, [queryClient])
}
