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

export const getPolicyHolderRows = (policyHolder: TPolicyHolder) => [
  { key: 'Name', value: policyHolder.name },
  { key: 'Age', value: policyHolder.age },
  { key: 'Primary Policy Holder', value: policyHolder.isPrimary ? 'Yes' : 'No' },
  { key: 'Phone Number', value: policyHolder.phoneNumber },
  { key: 'Address', value: formatAddress(policyHolder.address) },
];
