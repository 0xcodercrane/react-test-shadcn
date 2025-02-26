import { ModeToggle } from "../mode-toggle";

export function Footer() {
    return (
        <footer className="flex items-center justify-between gap-4 min-h-[3rem] md:h-20 py-2 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Built by <a href="https://github.com/0xcodercrane" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Mark Robert Dalida</a></p>
            <ModeToggle />
        </footer>
    )
}