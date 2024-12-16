export interface ICreateRecipeRequest {
  ingredientsIds: number[],
  name: string,
  instructions: string
  userId: number;
}