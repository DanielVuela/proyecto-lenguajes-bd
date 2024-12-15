import { initiateSession } from '@/src/db/sessionRepository';
import { ILoginRequest } from '../../../src/Models/Requests/ILoginRequest';


export async function POST(request: Request) {
  const req = await request.json() as ILoginRequest;
  const token = initiateSession(req.email, req.password)
  console.log("!!", token);
  return Response.json(token);
}


export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY!,
  //   },
  // })
  // const product = await res.json()
  // return Response.json({ product })
}