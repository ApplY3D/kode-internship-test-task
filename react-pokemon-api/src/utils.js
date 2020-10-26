export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const validateLogin = async (email, password) => {
  await delay(500);
  return email?.trim().toLowerCase() === "kode@kode.ru" &&
    password === "Enk0deng"
    ? { success: true }
    : { success: false, error: "Invalid user data" };
};

export const validate2FA = async (num) => {
  await delay(500);
  return num?.toString().length === 6 && typeof num === "number"
    ? { success: true, token: Date.now() + 7 * 24 * 60 * 60 * 1000 }
    : { success: false, error: "Enter any six digits" };
};

export const validateLogout = async () => {
  await delay(50);
  return { success: true };
};
