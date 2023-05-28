import { FormControl, Stack, NativeSelect } from "@mui/material";
import { Translate } from "../../context/TranslateContext";
import { useContext } from "react";
import PublicIcon from '@mui/icons-material/Public';

export default function SelectLanguage() {
    const { language, setLanguage } = useContext(Translate);

    const handleChange = (e: { target: { value: any; }; }) => {
        setLanguage(e.target.value);
    };

    return (
        <FormControl fullWidth>
          <Stack spacing={2} direction="row">
            <PublicIcon className="icon-language" style={{ marginTop:'4px' }} />
            <NativeSelect
              defaultValue={language}
              value={language}
              onChange={handleChange}
              style={{
                width: '100%',
              }}
            >
              <option value={"en"}>English</option>
              <option value={"pt-BR"}>Português</option>
              <option value={"es"}>Español</option>
              <option value={"russian"}>русский</option>
            </NativeSelect>
          </Stack>
        </FormControl>
    )
}