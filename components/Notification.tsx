import { FC } from 'react'
import { useQueryNotices } from '../hooks/useQueryNotices'
import { useSubscribeNotices } from '../hooks/useSubscribeNotices'
import { NoticeItem } from './NoticeItem'
import { NoticeForm } from './NoticeForm'

export const Notification: FC = () => {
  const { data: notices } = useQueryNotices()
  useSubscribeNotices()

  return (
    <>
      <p className="mb-4 text-center">Notification</p>
      <NoticeForm />
      <ul data-testid="ul-notice" className="my-5">
        {notices?.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            content={notice.content}
            user_id={notice.user_id}
          />
        ))}
      </ul>
    </>
  )
}
