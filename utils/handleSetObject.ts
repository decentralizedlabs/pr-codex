import { Dispatch, SetStateAction } from "react"

export default function handleSetObject(
  key: string,
  value: any,
  object: object,
  setObject: Dispatch<SetStateAction<object>>,
  setSuccess?: Dispatch<SetStateAction<boolean>>
) {
  if (setSuccess) setSuccess(false)
  const data = { ...object }
  data[key] = value
  setObject(data)
}
