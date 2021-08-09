import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from '@/store'

import Dashboard from './dashboard/index.tsx'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          <Dashboard />
        </div>
      </Provider>
    </HashRouter>
  )
}

export default App
