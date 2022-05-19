/**
 * simple file picker component
 */
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface FilePickerProps {
  onFileLoad: (file: File) => void;
}

export default function FilePicker(props: FilePickerProps) {
  return (
    <Box>
      <FormControl>
        <FormLabel>Select File</FormLabel>
        <Input
          type={"file"}
          onChange={(e) => {
            if (e.target?.files?.length) {
              props.onFileLoad(e.target.files[0]);
            }
          }}
        />
      </FormControl>
    </Box>
  );
}
