const Pencil = (props) => {
  return (
    <div>
        <svg width={800} height={600} >
            <path id='pencil'
                strokeWidth={1.5}
                stroke="#000"
                fill="#fff"
                d="M270.5 170.2h260v260h-260z"
            />
            <path id='pencilbg'
                fill="#38b2ac"
                d="M274.605 137.253h250.79c20.557 0 37.352 16.822 37.352 37.352v250.79c0 20.53-16.822 37.352-37.352 37.352h-250.79c-20.53 0-37.352-16.795-37.352-37.352v-250.79c0-20.557 16.795-37.352 37.352-37.352zm178.152 75.181l33.776 33.803c4.45 4.45 4.45 11.762 0 16.186l-18.703 18.702-49.988-49.988 18.702-18.703c4.45-4.45 11.736-4.45 16.213 0zm-76.85 160.535c-13.51 4.186-27.048 8.345-40.585 12.557-31.815 9.828-31.656 16.371-22.994-14.226l13.67-48.213-.053-.053 82.44-82.44 49.988 49.988-82.387 82.414-.08-.027zm-41.353-41.379l32.822 32.823c-8.874 2.728-17.775 5.457-26.676 8.238-20.875 6.411-20.769 10.73-15.1-9.377l8.954-31.684z"
                fillRule="evenodd"
                clipRule="evenodd"
            />
        </svg>

        <h1 id='submith1' style={{transform: `${props.editable === 1 ? 'translateX(-28px)' : 'translateX(0px)'}`}}>{props.editable === 1 ? 'Submit' : 'Edit'}</h1>

        <style jsx>{`

            #submith1 {
                transition: all .3s;
                position: fixed;
                font-size: 18px;
                margin-top: 21px;
                color: transparent;
                user-select: none;
                z-index: 9999;

                margin-left: 22%;
            }

            svg {
                position: fixed;
                transform: scale(.1);

                z-index: 10000;

                margin-top: -269px;
                margin-left: -3%;

                &:hover{
                    cursor: pointer;
                }

                &:hover ~ h1 {
                    transition: .6s;
                    color: #ababab;
                    margin-left: 19%;
                }

                &:hover > #pencilbg{
                    fill: #159894;
                }

                &:active > #pencil{
                    fill:  #e4eaf1;
                }
            }

        `}</style>

    </div>
  )
}

export default Pencil