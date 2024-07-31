type UserID = string | null;

export function getStoredUserId(): UserID {
  const userId = localStorage.getItem('userId');
  return userId;
}
