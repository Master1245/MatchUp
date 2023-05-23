import { ReactNode } from "react";
import './AnimateBackground.style.scss';

export function AnimateBackground({ children }: { children: ReactNode }) {
    return (
        <div className="animate-background">
            <div className="background-color">
            {children}
            </div>
        </div>
    );
}