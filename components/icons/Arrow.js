import React from 'react';

const Arrow = () =>{
    return(
        <div>
            <svg className='svg'
            width="{62}"
            height="{39}"
            viewBox="0 0 62 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M31 0L0 33L6.84722 39L31 13.5417L55.1528 39L62 33L31 0Z"
                fill="#F4F4F4"
                />
            </svg>

            <style jsx>{`

            * {
                width: 25px;
                height: 25px;
                line-height: 25px;
                margin-left: 8px;
                transition: all .6s ease;
                // transform: rotate(180deg);
            }

            svg{
                pointer-events: none;
            }

            path{
                fill: transparentize(#cfcfcf, 0.1);
            }

            `}</style>

        </div>
    );
}

export default Arrow;