import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import MuiAutoComplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Option {
  id: number;
  name: string;
}
interface Props {
  options: Option[];
  defaultValue?: Option[];
  label: string;
  placeholder: string;
  onChange: (options: Option[]) => void;
}

const Autocomplete = ({
  options,
  defaultValue,
  label,
  placeholder,
  onChange,
}: Props) => {
  return (
    <MuiAutoComplete
      multiple
      options={options}
      defaultValue={defaultValue}
      disableCloseOnSelect
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(evt, values) => onChange(values)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      sx={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
    />
  );
};

export default Autocomplete;
