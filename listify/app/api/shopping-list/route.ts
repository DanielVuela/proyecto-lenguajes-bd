import { createShoppingList, fetchCalculateIngredientCostsById } from "@/src/db/shoppingListRepository";

export async function POST(request: Request) {
  const req = await request.json() as ICreateShoppingListRequest;
  console.log(req);
  const shoppingList = await createShoppingList(req.userId,req.name ?? "unnamed list", req.recipes);
  return Response.json(shoppingList);
}

export async function GET(request: Request) {
  const reqUrl = request.url
  const { searchParams } = new URL(reqUrl)
  const recipeId = searchParams.get("recipeId");
  if (recipeId) {
    const ingredientsInfo = await fetchCalculateIngredientCostsById(Number(recipeId));
    console.log("ingredientsInfo", ingredientsInfo);
    return Response.json(ingredientsInfo);
  }
  return new Response(null, { status: 400 });
}

