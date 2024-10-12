'use server'

import { redirect } from 'next/navigation'

const navigate = async (url: string) => {
  redirect(url);
}

export {navigate};