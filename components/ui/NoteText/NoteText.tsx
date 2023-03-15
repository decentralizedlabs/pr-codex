import Info from "@components/icons/Info"

type Props = {
  text: string | JSX.Element
  error?: boolean
}

const NoteText = ({ text, error }: Props) => {
  return (
    <div className={`text-sm ${error ? "text-red-500" : "text-yellow-600"}`}>
      <p>
        <span className="inline-block w-[18px] h-[18px] mr-2 -mb-1">
          <Info />
        </span>
        {text}
      </p>
    </div>
  )
}

export default NoteText
