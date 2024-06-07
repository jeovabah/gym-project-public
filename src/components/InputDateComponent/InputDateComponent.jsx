import React, { useState } from "react";
import InputMask from "react-input-mask";
import { Label } from "../ui/label";


const InputDateComponent = (props) => {


    return (
        <div className="space-y-2">
            <Label htmlFor="date">Data de Nascimento</Label>
            <InputMask
                mask="99/99/9999"
                value={props.dateOfBirth}
                onChange={(e) => props.setdateOfBirth(e.target.value)}

            >
                {(inputProps) => (
                    <input
                        {...inputProps}
                        type="text"
                        id="date"
                        className="w-full p-2 bg-gray-300 rounded"
                        placeholder="DD/MM/YYYY"
                        defaultValue={props.defaultDate}

                    />
                )}
            </InputMask>
        </div>
    );
};

export default InputDateComponent;
