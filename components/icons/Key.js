import * as React from "react"

function Key(props) {
  return (
    <div>
        <svg
        width={24}
        height={24}
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        {...props}
        >
        <path d="M12.804 9a6 6 0 110 6H9l-1.506-1.503L6 15l-1.48-1.503L3 15l-3-3.032L2.53 9h10.274zm7.696 1.5a1.5 1.5 0 11-.001 3.001A1.5 1.5 0 0120.5 10.5z" />
        </svg>

        <style jsx>{`

            svg{
                margin-top: 4px;
                transform: scale(.6) scaleX(-1) rotate(-90deg);
            }

            path{
                fill: #6f8195;
            }

        `}</style>

    </div>
  )
}

export default Key
