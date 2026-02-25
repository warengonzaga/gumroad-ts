const DEFAULT_BASE_URL = "https://api.gumroad.com/v2";

/** Build a full URL from a base URL and path, appending query parameters */
export function buildUrl(
  basePath: string,
  path: string,
  params?: Record<string, unknown>,
): string {
  const base = basePath.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  const url = new URL(`${base}/${cleanPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url.toString();
}

export { DEFAULT_BASE_URL };
