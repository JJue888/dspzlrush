'use client'

import {ChangeEvent, useActionState, useState} from "react";
import classes from "./create-form.module.css";
import {dorms} from "@/app/lib/data";
import {State, createPNM} from "@/app/lib/actions";

export default function CreatePNMForm() {

    const initialState: State = { message: null, errors: {}};
    const [state, formAction] = useActionState(createPNM, initialState);
    const [selectedDorm, setSelectedDorm] = useState("");


    return (
        <form action={formAction}>
            <div className={classes.formContainer}>
                <div className={classes.firstNameContainer}>
                    <label htmlFor="firstName" className={classes.label}>
                        First Name:
                    </label>
                    <div className={classes.firstNameInput}>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            className={classes.input}
                            required
                        />
                    </div>
                </div>

                <div className={classes.lastNameContainer}>
                    <label htmlFor="lastName" className={classes.label}>
                        Last Name:
                    </label>
                    <div className={classes.lastNameInput}>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            className={classes.input}
                            required
                        />
                    </div>
                </div>

                <div className={classes.phoneNumberContainer}>
                    <label htmlFor="phoneNumber" className={classes.label}>
                        Phone Number:
                    </label>
                    <div className={classes.phoneNumberInput}>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            placeholder="123-456-7890"
                            className={classes.input}
                            required
                        />
                    </div>
                </div>

                <div className={classes.dormContainer}>
                    <label htmlFor="dorm" className={classes.label}>
                        Dorm
                    </label>
                    <div className={classes.dormInput}>
                        <select
                            id="dorm"
                            name="dorm"
                            className={classes.select}
                            value={selectedDorm}
                            onChange={(e) => setSelectedDorm(e.target.value)}
                        >
                            <option value="">Choose a dorm</option>
                            {dorms.map((dorm) => (
                                <option key={dorm} value={dorm}>
                                    {dorm}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedDorm === "Off Campus" ? (
                    <div className={classes.addressContainer}>
                        <label htmlFor="address" className={classes.label}>
                            Address:
                        </label>
                        <div className={classes.addressInput}>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Address"
                                className={classes.input}
                                required
                            />
                        </div>
                    </div>
                ) : selectedDorm && (
                    <div className={classes.roomNumberContainer}>
                        <label htmlFor="roomNumber" className={classes.label}>
                            Room Number:
                        </label>
                        <div className={classes.roomNumberInput}>
                            <input
                                id="roomNumber"
                                name="roomNumber"
                                type="text"
                                placeholder="123"
                                className={classes.input}
                                required
                            />
                        </div>
                    </div>
                )}

                <div className={classes.buttonGroup}>
                    <button type="button" className={classes.cancelButton}>
                        Cancel
                    </button>
                    <button type="submit" className={classes.submitButton}>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );

}