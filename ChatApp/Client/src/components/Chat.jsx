import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CiMenuKebab } from "react-icons/ci";
import { MdAddIcCall } from "react-icons/md";
import { users } from "../services/api";

export default function Chat({ user, children }) {
    const { id } = useParams();
    const [status, setStatus] = useState(null);

    const statusColor = {
        "Online": "",
        "Yesterday": "",
    }

    const activeUser = user || users.find((u) => u.id.toString() === id);

    if (!activeUser) {
        return (
            <div className="flex h-full w-full flex-col bg-[#F2F0EF]">
                {children}
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-[#F2F0EF] p-4">
            <div className="flex justify-between items-center">

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={activeUser.avatar}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        {activeUser.status == "Online" && (<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>)}
                    </div>

                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-sm">
                            {activeUser.name}
                        </span>
                        {activeUser == "Online" ? (<span className="text-xs text-green-700">
                            {activeUser?.status}
                        </span>) : (<span className="text-xs text-gray-700">
                            {activeUser?.status}
                        </span>)}
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600">
                    <button className="cursor-pointer">
                        <MdAddIcCall size={20} />
                    </button>

                    <button className="cursor-pointer">
                        <CiMenuKebab size={20} />
                    </button>
                </div>

            </div>
        </div>
    );
}