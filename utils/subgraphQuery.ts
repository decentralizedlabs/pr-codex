// import { Dispatch, SetStateAction, useEffect, useState } from "react"
// import { ApolloQueryResult } from "@apollo/client"

// export const graphQuery = async (
//   tokensQuery: string,
//   setData: Dispatch<SetStateAction<ApolloQueryResult<any>>>
// ) => {
//   const client = (await import("@utils/apollo-client")).default
//   const { gql } = await import("@apollo/client")

//   try {
//     const { data } = await client.query({
//       query: gql`
//         query {
//           ${tokensQuery}
//         }
//       `
//     })

//     setData(data)
//   } catch (err) {
//     console.log("Error fetching data: ", err)
//   }
// }

// const useQuery = (tokensQuery: string, dependencies = []) => {
//   const [data, setData] = useState(null)
//   useEffect(() => {
//     let execute = true
//     dependencies.map((dep) => {
//       !dep ? (execute = false) : null
//     })
//     if (execute) {
//       graphQuery(tokensQuery, setData)
//     }
//   }, dependencies)
//   return data
// }

// export default useQuery
export {}
