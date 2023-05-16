import { useContext } from "react";
import { TranslateContext } from "../../context/TranslateContext";

type textLanguageProps = {
    pt: string,
    en: string,
    es: string,
    russian: string,
}

export function TextLanguage({ pt, en, es, russian }: textLanguageProps) {
    const { language } = useContext(TranslateContext)!;

    const text = () => {
        switch (language) {
            case 'pt-BR' || 'pt' || 'pt-PT':
                return pt;
            case 'en':
                return en;
            case 'es':
                return es;
            case 'russian':
                return russian;
            default:
                return en;
        }
    }
    return (
        <>
            {text()}
        </>
    );
}