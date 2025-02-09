import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTheme } from '../../theme/ThemeProvider';

const DatePickerSimple = ({ selectedDate, setSelectedDate }) => {
    const { theme } = useTheme();

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                views={['year']}
                variant="standard"
                minDate={new Date(2020, 0)}
                maxDate={new Date(2030, 0)}
                label="Selecciona un año"
                value={new Date(selectedDate, 0)}
                onChange={(newDate) => setSelectedDate(newDate.getFullYear())}
                sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 30px rgba(71, 69, 69, 0.5)",
                    color: theme.colors.text,
                    padding: "10px",
                    "& .MuiInputLabel-root": {
                        color: theme.colors.label,
                    },
                    "& .MuiOutlinedInput-root": {
                        color: theme.colors.text,
                        "& fieldset": {
                            borderColor: theme.colors.label,
                        },
                        "&:hover fieldset": {
                            borderColor: theme.colors.primary,
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: theme.colors.secondary,
                        },
                        "& .MuiSvgIcon-root": {
                            color: theme.colors.label,
                        },
                        "& .MuiSvgIcon-root:hover": {
                            color: theme.colors.secondary,
                        },
                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePickerSimple;
