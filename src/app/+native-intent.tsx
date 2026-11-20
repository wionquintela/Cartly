// src/app/+native-intent.tsx
export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}) {
  if (path.includes("sso-callback")) {
    return "/sso-callback";
  }
  return path;
}
