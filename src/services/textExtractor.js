import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_TEXT_KEY;

export const textApi = createApi({
  reducerPath: "textApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://docxtract1.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", "docxtract1.p.rapidapi.com");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    textExtract: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        
        return {
          url: `extract`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useTextExtractMutation } = textApi;
