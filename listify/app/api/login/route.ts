import { ILoginRequest } from "../../../src/Models/Requests/ILoginRequest";


export async function POST(request: Request) {
  const req = await request.json() as ILoginRequest;
  return Response.json("ejemplo simple de post")
}


export async function GET(request: Request) {
  // acad ejo esto que imita el llamado a una bd
  
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY!,
    },
  })
  const product = await res.json()

  return Response.json({ product })
}