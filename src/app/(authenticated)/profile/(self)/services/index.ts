import { apiClient } from '@/lib/api';
import { getResponseData } from '@/app/common/services/auth/functions';
import type {
  ProfileUser,
  ProfileAddress,
  UpdateProfilePayload,
  UpdatePasswordPayload,
  CreateAddressPayload,
  UpdateAddressPayload,
} from './models';

/** Panel profile REST base (`/api/panel/profile`). */
const PROFILE_BASE = '/api/panel/profile';

/** `GET /api/panel/profile/me` — current user profile including embedded addresses when provided by API. */
export async function getProfile(): Promise<ProfileUser> {
  const response = await apiClient.get<{ data: ProfileUser }>(`${PROFILE_BASE}/me`);
  return getResponseData(response);
}

/** `PATCH /api/panel/profile/me` — partial update of profile fields. */
export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<ProfileUser> {
  const response = await apiClient.patch<{ data: ProfileUser }>(
    `${PROFILE_BASE}/me`,
    payload
  );
  return getResponseData(response);
}

/** `PATCH /api/panel/profile/me/password` — change password (current optional depending on backend rules). */
export async function updatePassword(
  payload: UpdatePasswordPayload
): Promise<void> {
  await apiClient.patch(`${PROFILE_BASE}/me/password`, payload);
}

/** `GET /api/panel/profile/me/addresses` — list saved delivery addresses. */
export async function getAddresses(): Promise<ProfileAddress[]> {
  const response = await apiClient.get<{ data: ProfileAddress[] }>(
    `${PROFILE_BASE}/me/addresses`
  );
  return getResponseData(response);
}

/** `POST /api/panel/profile/me/addresses` — create a new address. */
export async function createAddress(
  payload: CreateAddressPayload
): Promise<ProfileAddress> {
  const response = await apiClient.post<{ data: ProfileAddress }>(
    `${PROFILE_BASE}/me/addresses`,
    payload
  );
  return getResponseData(response);
}

/** `PATCH /api/panel/profile/me/addresses/:id` — update an existing address. */
export async function updateAddress(
  id: string,
  payload: UpdateAddressPayload
): Promise<ProfileAddress> {
  const response = await apiClient.patch<{ data: ProfileAddress }>(
    `${PROFILE_BASE}/me/addresses/${id}`,
    payload
  );
  return getResponseData(response);
}

/** `DELETE /api/panel/profile/me/addresses/:id` — remove an address. */
export async function deleteAddress(id: string): Promise<void> {
  await apiClient.delete(`${PROFILE_BASE}/me/addresses/${id}`);
}
