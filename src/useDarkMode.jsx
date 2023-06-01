import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState();

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme:dark)");

    //whenever match media changes
    const handleChange = (e) => setIsDark(e.matches);

    matchMedia.addEventListener("Change", handleChange);
    //   inittial state update
    setIsDark(matchMedia.matches);
    //   removing event listeners (cleaning up)
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const setDarkMode = () => setIsDark(true);
  const setLightMode = () => setIsDark(false);

  return { isDark, setDarkMode, setLightMode };
};

export default useDarkMode;
