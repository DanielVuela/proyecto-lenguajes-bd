export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  // const token = await initiateSession(req.email, req.password)
  return Response.json({});
}