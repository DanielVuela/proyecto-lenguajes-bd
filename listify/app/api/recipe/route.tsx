import { createRecipeWithIngredients, deleteRecipe, fetchRecipes, updateRecipe } from "@/src/db/recipeRepository";
import { ICreateRecipeRequest } from "@/src/Models/Requests/ICreateRecipeRequest";
import { IUpdateRecipeRequest } from "@/src/Models/Requests/IUpdateRecipeRequest";

export async function POST(request: Request) {
  const req = await request.json() as ICreateRecipeRequest;
  createRecipeWithIngredients(req.name, req.instructions, req.userId, req.ingredientsIds);
  return Response.json({});
}

export async function PUT(request: Request) {
  const req = await request.json() as IUpdateRecipeRequest;
  console.log(req);
  updateRecipe(req.id, req.name, req.instructions, req.ingredientsIds);
  return Response.json({});
}



export async function GET(request: Request) {
  const reqUrl = request.url
  const { searchParams } = new URL(reqUrl)
  const userIdParam = searchParams.get("userId");
  if (userIdParam) {
    const ingredientes = await fetchRecipes(Number(userIdParam));
    return Response.json(ingredientes);
  }
  return new Response(null, { status: 400 });
}


export async function DELETE(request: Request) {
  const req = await request.json() as {id: number};
  console.log(req.id);
  await deleteRecipe(req.id);
  return Response.json({});
}