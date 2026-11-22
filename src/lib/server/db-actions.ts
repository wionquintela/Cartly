import { integer } from "drizzle-orm/pg-core";
import { desc, eq } from "drizzle-orm";
import { db } from "./db/client";
import { groceryItems } from "./db/schema";

//getAll
export const listGroceryItems = async () => {
  const rows = await db
    .select()
    .from(groceryItems)
    .orderBy(desc(groceryItems.updated_at));

  return rows;
};

//create an item
export const createGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;

  priority: string;
}) => {
  const rows = await db
    .insert(groceryItems)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity), //failsafe, only takes highest value so if user enters -2, 1 will be the true value
      purchased: false,
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning(); //return the actual object

  return rows[0]; // so it returns {} not [{}]
};

//update item purchase value
export const setGroceryItemPurchased = async (input: {
  id: string;
  purchased: boolean;
}) => {
  const rows = await db
    .update(groceryItems)
    .set({ purchased: input.purchased, updated_at: Date.now() }) //set purchase boolean value and updatedAt date
    .where(eq(groceryItems.id, input.id)) //only edit where groceryItems id is equal to the inputId
    .returning(); //return the actual object

  if (!rows.length) return null; //if no value return null
  return rows[0];
};

//update item quantity
export const updateGroceryItemQuantity = async (input: {
  id: string;
  quantity: number;
}) => {
  const rows = await db
    .update(groceryItems)
    .set({
      quantity: Math.max(
        1,
        Math.floor(input.quantity), //convert to whole numbers
      ), //1 is the lowest possible value
      updated_at: Date.now(),
    })
    .where(eq(groceryItems.id, input.id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

//delete single item
export const deleteGroceryItem = async (id: string) => {
  await db.delete(groceryItems).where(eq(groceryItems.id, id)); // delete where id are equal to item id
};

//delete all purchased = true items
export const deletePurchasedItems = async () => {
  await db.delete(groceryItems).where(eq(groceryItems.purchased, true)); // delete all purchased items
};
