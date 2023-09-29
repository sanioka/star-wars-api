import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import App from './components/App'
import { IS_DEBUG } from './config'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 * 2, // 48 hours
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

function AppRoot() {
  const [isDevtools, setIsDevtools] = useState(IS_DEBUG)
  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setIsDevtools((state) => !state)
  }, [])

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ChakraProvider>
        <CSSReset />
        <ColorModeScript />
        <App />
      </ChakraProvider>
      {isDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </PersistQueryClientProvider>
  )
}

root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>,
)
