export const shortenAddress = (address?: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const normalizeAddress = (address: string) => {
  if (!address) return "";
  return address.toLowerCase();
};

export const compareAddress = (address1?: string, address2?: string) => {
  if (!address1 || !address2) return false;
  return normalizeAddress(address1) === normalizeAddress(address2);
};
