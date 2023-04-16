import Info from "@components/icons/Info"

type Props = {
  text: string | JSX.Element
  error?: boolean
}

const NoteText = ({ text, error }: Props) => {
  return (
    <div className={`text-sm ${error ? "text-red-500" : "text-yellow-600"}`}>
      <p>
        <span className="-mb-1 mr-2 inline-block h-[18px] w-[18px]">
          <Info />
        </span>
        {text}
      </p>
    </div>
  )
}

export default NoteText
