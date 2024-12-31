import React from 'react'
import { useStatus } from '../context/StatusContext'

export default function StatusBar() {
  const { status, setStatus } = useStatus()

  return (
    <div className="p-2 bg-gray-100">
      <p>Current Status: {status}</p>
      <button
        className="px-4 py-2 text-white bg-blue-600 rounded"
        onClick={() => setStatus('busy')}
      >
        Set to Busy
      </button>
    </div>
  )
}