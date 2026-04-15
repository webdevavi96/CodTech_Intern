import React from 'react';
import { getLastActive } from '../utils/getLastActive';

function ChatBubble({ messageProps, currUser, messageStatus, timeStamp }) {
  const isSent = messageStatus === 'sent';

  return (
    <div className={`flex items-end gap-2 ${isSent ? 'flex-row-reverse' : ''}`}>
      <img src={currUser.avatar} className="h-7 w-7 rounded-full object-cover" />

      <div className='flex flex-col'>
        <div
          className={`max-w-full rounded-2xl px-3 py-2 text-sm ${isSent ? 'rounded-br-sm bg-[#0f5c4c] text-white' : 'rounded-bl-sm bg-[#ADCCED] text-black'
            }`}
        >
          {messageProps.content}
        </div>
        <span className="text-[10px] text-gray-600">
          {getLastActive(timeStamp)}
        </span>     </div>
    </div>
  );
}

export default ChatBubble;
