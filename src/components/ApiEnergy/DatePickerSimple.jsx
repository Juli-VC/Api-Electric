import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const DatePickerSimple = ({ selectedDate, setSelectedDate }) => {


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                views={['year']}
                variant="standard"
                maxDate={["2025-12-31"]}
                label="Selecciona un año"
                value={new Date(selectedDate, 0)}
                onChange={(newDate) => setSelectedDate(newDate.getFullYear())}
                sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    // backdropFilter: "blur(10px)",
                    // border: "1px solid rgba(255, 255, 255, 1)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 30px rgba(71, 69, 69, 0.5)",
                    color: 'whitesmoke',
                    padding: "10px"
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePickerSimple;
