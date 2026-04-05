import React from 'react'

const Header = () => {
  return (
   <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Finance Dashboard</h2>
       <select className="border p-2 rounded">
        <option>Viewer</option>
        <option>Admin</option>
      </select>
    </div>

  )
}

export default Header