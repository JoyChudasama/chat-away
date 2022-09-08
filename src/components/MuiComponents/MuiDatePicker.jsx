import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MuiDatePicker = (props) => {

    const [date, setDate] = useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>

            <DatePicker
                label={props.label}
                className='muiDatePicker'
                value={date}
                onChange={(newDate) => { setDate(newDate) }}
                disableFuture={true}
                renderInput={(params) => <TextField {...params} />
                }
            />

        </LocalizationProvider>
    )
}

export default MuiDatePicker;