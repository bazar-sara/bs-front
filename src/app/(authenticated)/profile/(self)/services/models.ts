export type ProfileUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string;
  nationalCode: string | null;
  avatar: string | null;
  email: string | null;
  homeNumber: string | null;
  userType: string;
  status: string;
  phoneVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  addresses?: ProfileAddress[];
};

export type ProfileAddress = {
  id: string;
  userId: string;
  no: string | null;
  street: string;
  postalCode: string;
  city: string | null;
  province: string | null;
  title: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  homeNumber?: string;
  nationalCode?: string;
  email?: string;
  avatar?: string;
};

export type UpdatePasswordPayload = {
  currentPassword?: string;
  newPassword: string;
};

export type CreateAddressPayload = {
  no?: string;
  street: string;
  postalCode: string;
  city?: string;
  province?: string;
  title?: string;
};

export type UpdateAddressPayload = {
  no?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  province?: string;
  title?: string;
};
