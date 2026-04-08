import React from 'react';

function SendMessageBox() {
  return (
    <div className="flex w-full justify-between space-x-2 rounded-full border px-2 py-1">
      <input
        type="text"
        className="w-full rounded-full px-2 outline-0 active:border-0"
        placeholder="Enter message"
      />
      <button type="submit" className="cursor-pointer rounded-full bg-blue-600 p-2 text-white">
        Send
      </button>
    </div>
  );
}

export default SendMessageBox;
