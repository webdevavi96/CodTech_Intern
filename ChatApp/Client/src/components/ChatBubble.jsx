import React from "react";

function ChatBubble({props, messageStatus}) {

const status = {
    "sent": "flex-row-reverse",
    "recieved": "flex"
}

const statusColor = {
    "sent": "bg-[#0f5c4c] text-white rounded-br-none",
    "recieved": "bg-[#ADCCED] text-black rounded-bl-none"
}

const timeStampAlignment = {
    "sent": "text-end",
    "recieved": "text-start"
}

    return (
        <div className={`flex items-end gap-2 p-2 ${status[messageStatus]}`}>

            <img
                src={props.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
            />

            <div className="flex flex-col">

                <div className={`px-4 py-2 rounded-2xl max-w-xs ${statusColor[messageStatus]}`}>
                    {props.message}
                </div>

                <span className={`text-xs text-gray-500 mt-1 ml-2 ${timeStampAlignment[messageStatus]}`}>
                    {props.timeStamp}
                </span>
            </div>

        </div>
    );
}

export default ChatBubble;