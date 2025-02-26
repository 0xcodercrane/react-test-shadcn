import { createContext, useEffect, useState } from "react"

type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: string
    storageKey?: string
}

export type ThemeProviderState = {
    theme: string
    setTheme: (theme: string) => void
}

const initialState = {
    theme: "Dark",
    setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
    children,
    ...props
}: ThemeProviderProps) {
    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light")
        root.classList.add("dark")
    }, [])

    return (
        <ThemeProviderContext.Provider {...props} value={{
            theme: "dark",
            setTheme: () => null, // No-op since we're always using dark theme
        }}>
            {children}
        </ThemeProviderContext.Provider>
    )
}
