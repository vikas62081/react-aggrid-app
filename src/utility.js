export const setLocalStorage = (data, key = "grid") => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key = "grid") => {
  return JSON.parse(localStorage.getItem(key));
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
