import { faker } from '@faker-js/faker';
import { TPolicyHolder } from './types';

const policyholdersEndPoint =
  'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders';

export const fetchPolicyHolders = () =>
  fetch(policyholdersEndPoint, { method: 'GET' });

export const formatAddress = (address: TPolicyHolder['address']): string => {
  if (!address) return '';

  const { line1, line2, city, state, postalCode } = address;
  const addressLine2Display = line2 ? `, ${line2}` : '';

  return `${line1}${addressLine2Display}, ${city}, ${state} ${postalCode}`;
};

export const postPolicyHolder = () =>
  fetch(policyholdersEndPoint, {
    method: 'POST',
    body: JSON.stringify({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: faker.datatype.number(100),
      phoneNumber: faker.phone.number(),
      address: {
        line1: faker.address.streetAddress(),
        line2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        postalCode: faker.address.zipCode(),
      },
    }),
  });

export const getPolicyHolderRows = (policyHolder: TPolicyHolder) => [
  { key: 'Name', value: policyHolder.name },
  { key: 'Age', value: policyHolder.age },
  {
    key: 'Primary Policy Holder',
    value: policyHolder.isPrimary ? 'Yes' : 'No',
  },
  { key: 'Phone Number', value: policyHolder.phoneNumber },
  { key: 'Address', value: formatAddress(policyHolder.address) },
];
