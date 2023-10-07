const ACTUAL_ITEMS = ["1", "2"];
const ACTUAL_SIZES = ["small", "medium", "large"];

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
};

export { ITEMS, CartItem, Description, ACTUAL_ITEMS, ACTUAL_SIZES };
