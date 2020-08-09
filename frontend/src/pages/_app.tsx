import { AppProps } from 'next/app'
import { Grommet, grommet as grommetTheme } from 'grommet'
import { SWRConfig } from 'swr'
import Layout from '@/components/Layout'
import { fetcher } from '@/api'

const MyApp = ({ Component, pageProps }: AppProps): unknown => (
  <Grommet theme={grommetTheme} full>
    <SWRConfig value={{ fetcher }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  </Grommet>
)

export default MyApp
