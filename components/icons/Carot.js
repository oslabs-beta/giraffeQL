const Carot = () => {
  return (
    <div>
        <svg fill="white" width={16} height={16} >
        <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
        />
        </svg>

        <style jsx>{`

            *{
                margin: 8px;
            }
        
        `}</style>

    </div>
  )
}

export default Carot;