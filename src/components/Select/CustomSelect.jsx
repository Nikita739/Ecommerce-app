import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const CustomSelect = ({values, value, setValue, style, title}) => {
    return (
        <FormControl sx={style} fullWidth>
            <InputLabel id="select-type-label">{title}</InputLabel>
            <Select
                labelId="select-type-label"
                id="select-type"
                value={value}
                label="Type"
                onChange={(e) => setValue(e.target.value)}
            >
                <MenuItem value={0}>Not selected</MenuItem>
                {values.map(el =>
                    <MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;