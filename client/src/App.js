import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import OnBoarding from "./pages/OnBoarding";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Dica from "./pages/Dica";
import CountrySelector from "./components/CountrySelector";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dica" element={<Dica />} />
        <Route path="/test" element={<CountrySelector/>} />
      </Routes>
    </BrowserRouter>
   
  );
};

export default App;
App()