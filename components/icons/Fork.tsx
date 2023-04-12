const Fork = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      id="git-fork"
      {...props}
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="128"
        cy="188"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      ></circle>
      <circle
        cx="188"
        cy="67.998"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      ></circle>
      <circle
        cx="68"
        cy="67.998"
        r="28"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      ></circle>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        d="M68,95.99756v8.002a24,24,0,0,0,24.00049,24l72-.00146a24,24,0,0,0,23.99951-24V95.99756"
      ></path>
      <line
        x1="128.002"
        x2="128"
        y1="128"
        y2="160"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      ></line>
    </svg>
  )
}

export default Fork
