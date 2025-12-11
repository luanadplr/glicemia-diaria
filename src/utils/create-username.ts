export function createUsername(username: string): string {
  return username
    .normalize("NFD")
    .replace(/[U0300-\U036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .trim();
}
