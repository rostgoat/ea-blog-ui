/**
 * Validate email in forms
 */
export const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

/**
 * Validate password in forms
 */
export const passwordRegex = RegExp(
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
);

/**
 * Validate username in forms
 */
export const usernameRegex = RegExp(/^[A-Za-z]\w{7,14}$/);
