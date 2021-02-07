import * as React from "react"

const Clipboard = (props) => {
  return (
    <div>
        <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>{"background"}</title>
        <path fill="none" d="M-1-1h802v602H-1z" />
        <g>
            <title>{"Layer 1"}</title>
            <path
            strokeOpacity="null"
            strokeWidth="null"
            stroke="null"
            fill="#fff"
            d="M9.264 3.441h5.364v3.408H9.264z"
            />
            <path fill="#fff" d="M5.418 5.567h13.057v15.081H5.418z" />
            <path d="M17 4h-1.18A3 3 0 0013 2h-2a3 3 0 00-2.82 2H7a3 3 0 00-3 3v12a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3zm-7 1a1 1 0 011-1h2a1 1 0 011 1v1h-4V5zm8 14a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 011-1h1v1a1 1 0 001 1h6a1 1 0 001-1V6h1a1 1 0 011 1v12z" />
        </g>
        </svg>

        <style jsx>{`

            svg {
                position: fixed;
                transform: scale(1.5);
                top: 115px;
                right: 45px;

                z-index: 10;

                &:hover{
                    cursor: pointer;
                }
            }

        `}</style>
    </div>
  )
}

export default Clipboard;
