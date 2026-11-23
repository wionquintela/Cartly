import {
  deleteGroceryItem,
  setGroceryItemPurchased,
  updateGroceryItemQuantity,
} from "@/lib/server/db-actions";

//{id} is dynamic parameter from the file name [id]
export async function PATCH(request: Request, { id }: { id: string }) {
  try {
    //
    const body = await request.json();
    const item = body.quantity
      ? await updateGroceryItemQuantity({ id, quantity: body.quantity })
      : await setGroceryItemPurchased({
          //if quantity wasn't click, assume purchased button was
          id,
          purchased: body.purchased ?? true, //fallback to true
        });

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update item quantity";

    return Response.json({ error: message }, { status: 500 });
  }
}

//{id} is dynamic parameter from the file name [id]
export async function DELETE(request: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItem(id);
    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete item";

    return Response.json({ error: message });
  }
}
