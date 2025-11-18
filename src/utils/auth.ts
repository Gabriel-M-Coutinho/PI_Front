import Cookies from "js-cookie";

// Tempo máximo válido (em minutos)
const DEFAULT_VALIDITY_MINUTES = 120; // 2 horas

// Salva token + data de criação
export function saveToken(token: string) {
  const now = new Date().toISOString();

  Cookies.set("token", token, { expires: 7 }); // expira no navegador em 7 dias
  Cookies.set("token_created_at", now, { expires: 7 });
}

// Verifica se o token ainda é válido
export function isTokenValid(maxMinutes: number = DEFAULT_VALIDITY_MINUTES): boolean {
  const token = Cookies.get("token");
  const createdAt = Cookies.get("token_created_at");

  if (!token || !createdAt) return false;

  const created = new Date(createdAt);
  const now = new Date();

  const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);

  return diffMinutes < maxMinutes;
}

// Remove token e data
export function clearToken() {
  Cookies.remove("token");
  Cookies.remove("token_created_at");
}

// Limpa token se estiver velho
export function clearTokenIfOld(maxMinutes: number = DEFAULT_VALIDITY_MINUTES) {
  if (!isTokenValid(maxMinutes)) {
    clearToken();
    return false;
  }
  return true;
}

// Retorna se usuário está logado
export function isLogged(maxMinutes: number = DEFAULT_VALIDITY_MINUTES) {
  return clearTokenIfOld(maxMinutes);
}
