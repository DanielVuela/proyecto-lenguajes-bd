import { createIngredient, deleteIngredient, fetchIngredientes, updateIngredient } from "@/src/db/ingredientRepository";

export async function POST(request: Request) {
  const req = await request.json() as ICreateIngredientRequest;
  createIngredient(req.name, req.unit, req.price, req.userId,req.quantity);
  return Response.json({});
}

export async function PUT(request: Request) {
  const req = await request.json() as IUpdateIngredienteRequest;
  updateIngredient(req.id, req.name, req.unit, req.price,req.quantity);
  return Response.json({});
}

export async function GET(request: Request) {
  const reqUrl = request.url
  const { searchParams } = new URL(reqUrl)
  const userIdParam = searchParams.get("userId");
  if (userIdParam) {
    const ingredientes = await fetchIngredientes(Number(userIdParam));
    return Response.json(ingredientes);
  }
  return new Response(null, { status: 400 });
}

export async function DELETE(request: Request) {
  const req = await request.json() as {id: number};
  console.log(req.id);
  await deleteIngredient(req.id);
  return Response.json({});
}

