import { AppProps } from 'next/app'
import '../styles/index.css'
import "reflect-metadata";
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
