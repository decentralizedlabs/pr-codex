const Logo = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 241 241"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="110" y="9" width="20" height="224" fill="currentColor" />
      <rect
        x="232"
        y="111"
        width="20"
        height="113"
        transform="rotate(90 232 111)"
        fill="currentColor"
      />
      <circle
        cx="120.5"
        cy="120.5"
        r="110.5"
        stroke="currentColor"
        strokeWidth="20"
      />
    </svg>
  )
}

export default Logo
