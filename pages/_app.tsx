import { AppProps } from 'next/app'
import '../styles/index.css'
import "reflect-metadata";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
