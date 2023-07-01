import { createContext, useState } from 'react';

export const ToggleModeContext = createContext();

export default function ToggleModeProvider({children}) {
    const [click,setClick] = useState(true);
    const handleToggleMode = () => {
        setClick((prev) => !prev);
    }

    return (
        <ToggleModeContext.Provider value={{click,handleToggleMode}}>
            {children}
        </ToggleModeContext.Provider>
    );
}