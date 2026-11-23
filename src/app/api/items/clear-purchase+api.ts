import { deletePurchasedItems } from "@/lib/server/db-actions";

export async function POST() {
  try {
    await deletePurchasedItems();
    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete completed items";

    return Response.json({ error: message });
  }
}
