const toggleThemeMode = async () => {
  const isDarkMode = await window.darkMode.toggle();
  return isDarkMode;
};

const resetToSystemTheme = async () => {
  await window.darkMode.system();
};

export { toggleThemeMode, resetToSystemTheme };
