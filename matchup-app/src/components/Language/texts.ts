import { privacy_policy } from "./texts/privacy_policy";

interface Texts {
    [key: string]: {
        [key: string]: string;
    };
}
export const texts: Texts = {
    "Privacy Policy": privacy_policy,
}