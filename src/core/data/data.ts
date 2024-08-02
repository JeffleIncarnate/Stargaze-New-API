const ACTUAL_ITEMS = ["1", "2", "3", "4"];
const ACTUAL_SIZES = ["small", "medium", "large", "black", "pink"];

interface CartItem {
  id: string;
  quantity: number;
  size: string;
}

interface Description {
  id: string;
  quantity: number;
  size: string;
  shirtName: string;
}

const ITEMS = {
  "1": {
    cost: 45,
  },
  "2": {
    cost: 45,
  },
  "3": {
    cost: 29.99,
  },
  "4": {
    cost: 29.99,
  },
};

export { ITEMS, CartItem, Description, ACTUAL_ITEMS, ACTUAL_SIZES };
