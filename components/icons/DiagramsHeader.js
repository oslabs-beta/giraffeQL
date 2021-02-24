function DiagramsHeader(props) {
  return (
    <div>
        <svg
        width={1750}
        height={308}
        viewBox="0 0 1750 308"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
        <path d="M16.816 308V0H1750v308H16.816z" fill="#414A93" />
        <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#49539c" />
        </svg>

        <style jsx>{`

            *{
                position: absolute;
                margin-bottom: 400px;
                width: 100%;
                height: 100%;
            }

        `}</style>

    </div>
  )
}

export default DiagramsHeader;