// 'use client'
export const dynamic = "force-dynamic";

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { type NextRequest, NextResponse } from "next/server";
import { useSearchParams } from "next/navigation";

export async function GET(req: NextRequest, res: NextApiResponse) {
  // console.log(name, keyword, method);

  const searchParams = req.nextUrl.searchParams;
  console.log("dd", searchParams);
  const query = searchParams.get("query");
  const response = await axios.get("https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode", {
    params: {
      query: query,
    },
    headers: {
      "X-NCP-APIGW-API-KEY-ID": "ugm16gkcw2",
      "X-NCP-APIGW-API-KEY": "mDTqyhP8j8bw0IPW8dOaPDG0Wm2VRiSzyqvMotRw",
    },
  });
  const data = await response.data;
  return NextResponse.json({ data });
  // return res.status(200).json({ data });
}

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams
//   const query = searchParams.get('query')
//   return new Response(`Hello, Next.js! ${query}`);
// }


// export async function GET(request: NextRequest) {
//   const response = await axios.get("https://pokeapi.co/api/v2/pokemon/1", {})
//   const data = await response.data;
//   return NextResponse.json({ data })
// }