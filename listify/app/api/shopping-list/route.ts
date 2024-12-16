import { createShoppingList } from "@/src/db/shoppingListRepository";

export async function POST(request: Request) {
  const req = await request.json() as ICreateShoppingListRequest;
  console.log(req);
  createShoppingList(req.userId,req.name ?? "unnamed list", req.recipes);
  return Response.json({});
}