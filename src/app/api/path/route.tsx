// 'use client'
export const dynamic = 'force-dynamic'

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { type NextRequest, NextResponse } from "next/server";
import { useSearchParams } from 'next/navigation';

export async function GET(req: NextRequest, res: NextApiResponse) {
  const searchParams = req.nextUrl.searchParams
  const start = searchParams.get('start')
  const goal = searchParams.get('goal')
  const option = searchParams.get('option')
  const response = await axios
    .get("https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving", {
      params: {
        start: start,
        goal: goal,
        option: option
      },
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "ugm16gkcw2",
        "X-NCP-APIGW-API-KEY": "mDTqyhP8j8bw0IPW8dOaPDG0Wm2VRiSzyqvMotRw",
      },
    })
  const data = await response.data;
  return NextResponse.json({ data })
}

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams
//   const query = searchParams.get('query')
//   return new Response(`Hello, Next.js! ${query}`);
// }