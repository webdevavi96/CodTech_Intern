import React from 'react'

function SendMessageBox() {
  return (
      <div className=" w-full flex justify-between space-x-2 px-2 py-1 border rounded-full">
          <input type="text" className="w-full rounded-full bg-white px-2 active:border-0 outline-0" placeholder="Enter message" />
          <button type="submit" className="p-2 bg-blue-600 rounded-full text-white cursor-pointer">Send</button>
      </div>
  )
}

export default SendMessageBox