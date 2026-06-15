import { getThemeByTime } from "../utils/theme";

const [theme, setTheme] = useState(getThemeByTime());

useEffect(() => {
  const interval = setInterval(() => {
    setTheme(getThemeByTime());
  }, 60000); // every 1 min update

  return () => clearInterval(interval);
}, []);