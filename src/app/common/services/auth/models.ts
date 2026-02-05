// Refresh token API response (wrapped or flat)
export type RefreshTokenApiResponse = {
  data?: { accessToken: string; refreshToken: string };
  accessToken?: string;
  refreshToken?: string;
};

export type RefreshTokenResult = {
  accessToken: string;
  refreshToken: string;
};

export type JwtPayload = {
  sub?: string;
  userType?: string;
  exp?: number;
  [key: string]: unknown;
};
