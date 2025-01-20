const ThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);

    return (
        <button onClick={toggleTheme}>🌗</button>
    );
};

export default ThemeToggle;
