import { Logo } from "../logo";

export function Header() {

    return (
        <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
            <div className="container flex h-14 items-center px-4 md:px-8">
                <div className="flex items-center space-x-2">
                    <Logo />
                    <span className="hidden font-bold sm:inline-block">
                        Bitcoin Tracker
                    </span>
                </div>
            </div>
        </header>
    )
}