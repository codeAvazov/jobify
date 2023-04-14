export function passwordValidator(password) {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{8,}$/;

  return passwordRegex.test(password)
}

export function emailValidator(email) {
  const emailRegex = /^[\w.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email)
}
