export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const defaultCheckoutInfo: CheckoutInfo = {
  firstName: 'Soumadip',
  lastName: 'Basu',
  postalCode: '700001',
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTShirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;
