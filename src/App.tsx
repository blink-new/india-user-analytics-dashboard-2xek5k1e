import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import { blink } from './blink/client'
import { RefreshCw } from 'lucide-react'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <div className="text-lg font-semibold text-gray-900">Loading Dashboard...</div>
          <div className="text-sm text-gray-600">Initializing user analytics</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-2xl font-bold text-gray-900 mb-4">India User Analytics Dashboard</div>
          <div className="text-gray-600 mb-6">
            Please sign in to access the user analytics dashboard and explore data across Indian states and districts.
          </div>
          <button
            onClick={() => blink.auth.login()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  return <Dashboard />
}

export default App