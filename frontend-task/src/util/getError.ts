import { SerializedError } from "@reduxjs/toolkit"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

export default function getError(error: FetchBaseQueryError | SerializedError) {
  if ("error" in error) {
    return error.error
  }

  if ("message" in error) {
    return error.message as string
  }

  if ("data" in error) {
    if (typeof error.data === "string") {
      return error.data
    }

    if (
      !!error.data &&
      typeof error.data === "object" &&
      "message" in error.data
    ) {
      return error.data.message as string
    }
  }

  return "An unknown error occurred"
}
