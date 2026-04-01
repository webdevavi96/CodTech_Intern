import React from 'react'

function Card(props) {    

    return (
        <div className="mx-auto bg-white shadow-md rounded-xl overflow-hidden mb-6">

            <div className="flex flex-col md:flex-row">

                <div className="md:w-1/3">
                    <img
                        src={props.props.urlToImage}
                        alt={props.props.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4 md:w-2/3 flex flex-col justify-between">

                    <h1 className="text-xl font-semibold mb-2">
                        {props.props.title}
                    </h1>

                    <p className="text-gray-600 text-sm mb-4">
                        {props.props.description || props.props.content}
                    </p>

                    <div className="flex items-center justify-between mt-auto">

                        <a
                            href={props.props.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Read more →
                        </a>

                        <div className="text-xs text-gray-500 text-right">
                            <p>{props.props.author || "Unknown"}</p>
                            <p>{new Date(props.props.publishedAt).toLocaleDateString()}</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Card