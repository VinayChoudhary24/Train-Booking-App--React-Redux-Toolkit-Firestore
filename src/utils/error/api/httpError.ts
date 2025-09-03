export type HttpErrorPayload = {
  status: number | null;
  message: string;
  details?: unknown;
};
import type { AxiosError } from "axios";

export const toHttpErrorPayload = (err: unknown): HttpErrorPayload => {
  const axiosErr = err as AxiosError<{ message?: string }>;
  if (axiosErr?.response) {
    return {
      status: axiosErr.response.status ?? null,
      message:
        axiosErr.response.data?.message ?? axiosErr.message ?? "Request failed",
      details: axiosErr.response.data ?? undefined,
    };
  }
  return {
    status: null,
    message: (err as Error)?.message ?? "Request failed",
  };
};
