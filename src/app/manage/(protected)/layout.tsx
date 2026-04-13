import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isValidSession } from '@/lib/adminAuth'

const ADMIN_COOKIE_NAME = 'yehi_admin_session'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value

  if (!sessionToken || !(await isValidSession(sessionToken))) {
    redirect('/manage/login')
  }

  return children
}
