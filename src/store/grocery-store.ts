import { create } from "zustand";

export type GroceryCategory =
  "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks";
export type GroceryPriority = "low" | "medium" | "high";

export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  purchased: boolean;
  priority: GroceryPriority;
};

export type CreateItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type ItemsResponse = { items: GroceryItem[] };
type ItemResponse = {
  item: GroceryItem;
};

type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (input: CreateItemInput) => Promise<GroceryItem | void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearPurchased: () => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    //loading
    set({ isLoading: true, error: null });
    try {
      //fetch all items default GET() from api
      const res = await fetch("/api/items");
      //set json response items in state
      const payload = (await res.json()) as ItemsResponse;

      if (!res.ok) {
        throw new Error(`Request failed ${res.status}`);
      }

      //on success set items from payload
      set({ items: payload.items });
    } catch (error) {
      console.log("Error loading items:", error);
      set({ error: "Something went wrong" });
    } finally {
      set({ isLoading: false });
    }
  },
  addItem: async (input) => {
    set({ error: null });
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: input.quantity,
          priority: input.priority,
        }),
      });
      const payload = (await res.json()) as ItemResponse;

      if (!res.ok) {
        throw new Error(`Request failed ${res.status}`);
      }

      //pushes old state back and add the new item into the array as first
      set((state) => ({
        items: [payload.item, ...state.items],
      }));
      return payload.item;
    } catch (error) {
      console.log("Error adding item:", error);
      set({ error: "Something went wrong" });
    }
  },
  updateQuantity: async (id, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });
    try {
      // optimistic update, UI update instantly
      set((state) => ({
        error: null,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: nextQuantity } : item,
        ),
      }));

      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) {
        throw new Error(`Request failed ${res.status}`);
      }

      //map all items then only change where id matches and retains other
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.log("Error updating item quantity:", error);
      set({ error: "Something went wrong" });
    }
  },
  togglePurchased: async (id) => {
    //get current item based on id
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;
    //change purchased as true
    const nextPurchased = !currentItem.purchased;
    set({ error: null });
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchased: nextPurchased }), //set purchased as true
      });
      const payload = (await res.json()) as ItemResponse;
      if (!res.ok) {
        throw new Error(`Request failed ${res.status}`);
      }

      //map all items then only change where id matches and retains other
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.log("Error updating purchased boolean:", error);
      set({ error: "Something went wrong" });
    }
  },
  removeItem: async (id) => {
    set({ error: null });
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Request failed ${res.status}`);
      }
      //only show items where id is not same so the item with same id will be removed
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log("Error removing item:", error);
      set({ error: "Something went wrong" });
    }
  },
  clearPurchased: async () => {
    set({ error: null });
    try {
      const res = await fetch("/api/items/clear-purchase", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`Request failed ${res.status}`);
      }
      //only show where items are not purchased so purchased items are cleared
      const items = get().items.filter((item) => !item.purchased);
      set({ items });
    } catch (error) {
      console.log("Error clearing purchased items:", error);
      set({ error: "Something went wrong" });
    }
  },
}));
