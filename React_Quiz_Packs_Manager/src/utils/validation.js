export const validateEmail = (email) => {
  if (!email) return 'Email обязателен'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Некорректный email'
  }

  return null
}

export const validatePassword = (password) => {
  if (!password) return 'Пароль обязателен'

  if (password.length < 4) {
    return 'Минимум 4 символа'
  }

  if (password.length > 64) {
    return 'Максимум 64 символа'
  }

  if (/\s/.test(password)) {
    return 'Пароль не должен содержать пробелы'
  }

  if (!/[a-zA-Z]/.test(password)) {
    return 'Должна быть хотя бы одна буква'
  }

  if (!/\d/.test(password)) {
    return 'Должна быть хотя бы одна цифра'
  }

  return null
}