import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const notifyOutOfStock: FunctionDeclaration = {
  name: "notifyOutOfStock",
  description: "Notifies the shop owner that a specific product or item requested by the user is not available in the catalogue.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      itemName: {
        type: Type.STRING,
        description: "The name of the item requested by the user that is not available."
      }
    },
    required: ["itemName"]
  }
};

const addItemToCart: FunctionDeclaration = {
  name: "addItemToCart",
  description: "Adds a specific product directly to the user's shopping cart.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      productId: {
        type: Type.STRING,
        description: "The unique ID of the product to add to the cart as found in the catalogue."
      },
      quantity: {
        type: Type.NUMBER,
        description: "The number of items to add. Defaults to 1 if not specified."
      }
    },
    required: ["productId"]
  }
};

const SYSTEM_PROMPT = `
You are the "Gothar.wears AI Style Assistant", a premium 24/7 fashion consultant for a luxury ladies' wear e-commerce store.
Your goal is to provide a world-class shopping experience.

CONSTRAINTS:
1. PRODUCT SEARCH: When a user asks about items or availability, consult the product catalogue provided below.
2. LINKS: If a product is available, provide the name and clearly state its availability. (Format: [Product Name](/product/[ID])).
3. ADD TO CART: If the user expresses intent to buy, order, or "add to cart" a specific product, YOU MUST use the 'addItemToCart' function.
   - If the user doesn't specify quantity, assume 1 but mention they can change it.
   - Example: "I've added the Silk Evening Gown to your cart! Would you like to add another one or perhaps a matching accessory?"
4. MISSING PRODUCTS: If a product is NOT in the catalogue (e.g., jersey, sneakers, budget items), you MUST:
   - Say exactly: "Product not yet available, check someother time, you can check more."
   - Immediately use the 'notifyOutOfStock' function with the requested item name.
   - Suggest 2-3 alternatives from the current catalogue.
5. TONE: Professional, sophisticated, helpful, and elegant.
6. FUNCTIONS: Answer order tracking questions by asking for an order number. Answer cart/checkout questions by explaining how to use the cart icon or offering to add items yourself.

PRODUCT CATALOGUE:
${JSON.stringify(PRODUCTS.map(p => ({ 
    id: p.id, 
    name: p.name, 
    category: p.category, 
    price: p.price, 
    description: p.description,
    inStock: p.inStock
})), null, 2)}

Only recommend products listed in the catalogue. If the user asks for something else, follow the MISSING PRODUCTS constraint.
`;

export async function chatWithAI(messages: { role: 'user' | 'model', text: string }[]) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ functionDeclarations: [notifyOutOfStock, addItemToCart] }],
      },
      history: messages.slice(0, -1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }))
    });

    const response = await chat.sendMessage({
        message: messages[messages.length - 1].text
    });

    return { 
      text: response.text || "I've processed your request.", 
      functionCalls: response.functionCalls 
    };
  } catch (error) {
    console.error("AI Chat Error:", error);
    return { text: "I'm having trouble connecting right now. Please try again later.", isNotification: false };
  }
}
