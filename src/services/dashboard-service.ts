import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const eventsUserApi = createApi({
  reducerPath: "eventsUser",
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/events/user`}),
  endpoints: (builder) => ({

      // get all products
      getAllEvents: builder.query({
          query: () => ""
      }),
      // get single product
      getSingleEvent: builder.query({
          query: (id) => `/${id}`
      }),

      // add a mutation
      addNewEvent: builder.mutation({
          query: (newEvent) => ({
              url: "",
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: newEvent
          })
      }),
      
      // // add a mutation
      // updateEvent: builder.mutation({
      //     query: ({id, updatedProduct}) => ({
      //         url: `/create/${id}`,
      //         method: "PUT",
      //         headers: {
      //             "Content-Type": "application/json",
      //         },
      //         body: updatedProduct
      //     })
      // })
  })
})

export const { useGetAllEventsQuery, useGetSingleEventQuery, useAddNewEventMutation } = eventsUserApi