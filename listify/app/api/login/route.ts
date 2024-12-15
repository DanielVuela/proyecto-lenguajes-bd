import { initiateSession, logOut, getUserInfo } from '@/src/db/sessionRepository';
import { ILoginRequest } from '../../../src/Models/Requests/ILoginRequest';
import { ILogoutRequest } from '@/src/Models/Requests/ILogoutRequest';


export async function POST(request: Request) {
  const req = await request.json() as ILoginRequest;
  const token = await initiateSession(req.email, req.password)
  console.log("token de la sesion: ", token);
  return Response.json(token);
}


export async function DELETE(request: Request) {
  const req = await request.json() as ILogoutRequest;
  const token = await logOut(req.token)
  return Response.json({});
}

export async function GET(request: Request) {
  const reqUrl = request.url
  const { searchParams } = new URL(reqUrl)
  const tokenParam = searchParams.get("token");
  if (tokenParam) {
    const id = await getUserInfo(tokenParam);
    return Response.json({id});
  }
  return new Response(null, { status: 400 });
}