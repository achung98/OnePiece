export interface Category {
  [month: string]: {
    Food?: {
      [subcategory: string]: number;
    },
    'Rent/Mortgage'?: {
      [subcategory: string]: number;
    },
    Entertainment?: {
      [subcategory: string]: number;
    },
    Transportation?: {
      [subcategory: string]: number;
    },
    Utilities?: {
      [subcategory: string]: number;
    },
    'Misc.'?: {
      [subcategory: string]: number;
    }
  }
};
