import { useContext } from "react";
import { Translate } from "../../context/TranslateContext";
import { words } from "./words";
import { texts } from "./texts";

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

type WordLanguageProps = {
    text: string // original language is english
}

export function WordLanguage({ text }: WordLanguageProps) {
    const { language } = useContext(Translate)!;

    const text_translated = searchWord(text, language)
    return (
        <>
            {text_translated}
        </>
    );
}

type TextLanguageProps = {
    title: string // original language is english
}

export type Texts = {
    [key: string]: string | undefined;
}

export function searchText(title: string, language: string): any {
    language = aliases[language] || language;
    const textObj = texts[title];
    if (textObj && language in textObj) {
        return null // todo
    } else {
        return title;
    }

}

export function TextLanguage({ title }: TextLanguageProps) {
    const { language } = useContext(Translate)!;

    const title_translated = searchText(title, language)
    return (
        <>
            {title_translated}
        </>
    );
}