import { ReactNode } from "react";
import './AnimateBackground.style.scss';

export function AnimateBackground({ children }: { children: ReactNode }) {
    return (
        <div className="background-color">
            <div className="animate-background">
            {children}
            </div>
        </div>
    );
}