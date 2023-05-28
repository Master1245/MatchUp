import Navbar from "../../components/navbar/Navbar";
import { TextLanguage, WordLanguage } from "../../components/Language/Language";
import { Button } from "@mui/material";

export function PrivacyPolicy() {
    const text_privacy_policy = TextLanguage({title: 'Privacy Policy'})

    function addBreakLinesAndP(text: any){
        text = String(text.props.children)
        const textWithBreakLines = text.replace(/\n/g, '<br />')
        const textWithP = '<p>' + textWithBreakLines + '</p>'
        return {__html: textWithP}
    }
    return (
        <>
            <Navbar />
            <Button
                onClick={() => window.close()}
                variant="contained" size="medium" sx={{m:1}}>
                <WordLanguage text="Back" />
            </Button>
            <div className="container" dangerouslySetInnerHTML={addBreakLinesAndP(text_privacy_policy)}>
            </div>
        </>
    )
}