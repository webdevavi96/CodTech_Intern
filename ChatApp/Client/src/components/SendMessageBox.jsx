import React from 'react';

function SendMessageBox({ handler }) {
  const [message, setMessage] = React.useState('');

  const handleSubmit = () => {
    if (!message) return;
    handler(message);
    setMessage('');
  };

  return (
    <div className="flex items-center gap-2 border-t px-3 py-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
        autoFocus={true}
        className="flex-1 rounded-full border px-4 py-2 text-sm outline-none"
      />

      <button onClick={handleSubmit} className="px-2 font-medium text-blue-600">
        Send
      </button>
    </div>
  );
}

export default SendMessageBox;
