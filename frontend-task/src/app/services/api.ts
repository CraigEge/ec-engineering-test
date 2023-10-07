import { createApi } from "@reduxjs/toolkit/query/react"
import baseQuery from "./api/baseQuery"

export const TAGS = ["User", "Parc", "Booking"] as const

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g. where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used in order to support tag invalidation,
   * among other features
   */
  reducerPath: "eurocampApi",
  /**
   * A fetchBaseQuery with handlers on top
   *
   * withRetry: retry every request 5 times (except invalid credentials)
   * withBackendHandling: all pre-processing of requests the way the backend expects it
   * withTokenRefresh: refresh the access_token if it's expired (and retry the request),
   *                   if the refresh_token is expired, log the user out
   */
  baseQuery,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: TAGS,
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
})
