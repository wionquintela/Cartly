import { createGroceryItem, listGroceryItems } from "@/lib/server/db-actions";

export async function GET() {
  try {
    const items = await listGroceryItems();

    return Response.json({ items });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch items";

    return Response.json({ error: message });
  }
}

export async function POST(request: Request) {
  try {
    //from user
    const body = await request.json();
    //destructure body
    const { name, category, quantity, priority } = body;

    if (!name || !category || !priority) {
      return Response.json(
        {
          error: "Please provide all required fields.",
        },
        { status: 400 },
      );
    }

    //pass data to db query create
    const createdItem = await createGroceryItem({
      name,
      category,
      quantity,
      priority,
    });

    return Response.json({ item: createdItem }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create item";

    return Response.json({ error: message });
  }
}
