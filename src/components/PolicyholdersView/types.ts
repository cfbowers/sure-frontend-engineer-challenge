export type TPolicyHolder = {
  name: string;
  age: number;
  isPrimary: boolean;
  phoneNumber: string;
  address: {
    city: string;
    line1: string;
    line2: string;
    postalCode: string;
    state: string;
  };
};