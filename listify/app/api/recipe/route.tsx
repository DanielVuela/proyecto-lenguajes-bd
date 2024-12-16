import { createRecipeWithIngredients } from "@/src/db/recipeRepository";
import { ICreateRecipeRequest } from "@/src/Models/Requests/ICreateRecipeRequest";

export async function POST(request: Request) {
  const req = await request.json() as ICreateRecipeRequest;
  createRecipeWithIngredients(req.name, req.instructions, req.userId, req.ingredientsIds);
  return Response.json({});
}