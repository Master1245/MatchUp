import { useContext } from "react";
import { Translate } from "../../context/TranslateContext";
import { words } from "./words";

export type Word = {
    [key: string]: string | undefined;
}

const aliases: Record<string, string> = {
    'en-US': 'en',
    'pt-BR': 'pt',
    'es-ES': 'es',
}

export function searchWord(word: string, language: string): string {
    language = aliases[language] || language;
    const wordObj = words[word];
    if (wordObj && language in wordObj) {
        return wordObj[language] || word;
    } else {
        return word;
    }
}

type textLanguageProps = {
    text: string // original language is english
}

export function TextLanguage({ text }: textLanguageProps) {
    const { language } = useContext(Translate)!;

    const text_translated = searchWord(text, language)
    return (
        <>
            {text_translated}
        </>
    );
}