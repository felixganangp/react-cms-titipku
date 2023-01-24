export interface CreateCustomer {
  imageCustomer: string | File | Blob;
  idCustomer?: string;
  name: string;
  kurType: object | null;
  adminFee: string;
  birthDate: object | null;
  phoneNumber: string;
  email: string;
  addressKtp: string;
  addressDomisili: string;
  lapakName: object | null;
  nikKtp: string;
  imageNik: string | File | Blob;
  kkNumber: string;
  imageKk: string | File | Blob;
  npwp: string;
  imageNpwp: string | File | Blob;
  imageSKUsaha: string;
}
