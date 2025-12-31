'use client'

import {useActionState, useState} from "react";
import classes from "./create-form.module.css";
import {dorms} from "@/app/lib/data";
import {State, createPNM} from "@/app/lib/actions";
import Link from "next/link";

export default function CreatePNMForm() {

    const initialState: State = { message: null, errors: {}};
    const [state, formAction, isPending] = useActionState(createPNM, initialState);
    const [selectedDorm, setSelectedDorm] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [roomNumber, setRoomNumber] = useState("");

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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            aria-describedby="firstName-error"
                        />
                    </div>
                    {state.errors?.firstName && (
                        <p id="firstName-error" className={classes.error}>
                            {state.errors.firstName[0]}
                        </p>
                    )}
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            aria-describedby="lastName-error"
                        />
                    </div>
                    {state.errors?.lastName && (
                        <p id="lastName-error" className={classes.error}>
                            {state.errors.lastName[0]}
                        </p>
                    )}
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
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            aria-describedby="phoneNumber-error"
                        />
                    </div>
                    {state.errors?.phoneNumber && (
                        <p id="phoneNumber-error" className={classes.error}>
                            {state.errors.phoneNumber[0]}
                        </p>
                    )}
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
                            aria-describedby="dorm-error"
                        >
                            <option value="">Choose a dorm</option>
                            {dorms.map((dorm) => (
                                <option key={dorm} value={dorm}>
                                    {dorm}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/*{state.errors?.location && typeof state.errors.location === 'object' && state.errors.location.dorm && (*/}
                    {/*    <p id="dorm-error" className={classes.error}>*/}
                    {/*        {state.errors.location.dorm[0]}*/}
                    {/*    </p>*/}
                    {/*)}*/}
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                aria-describedby="address-error"
                            />
                        </div>
                        {/*{state.errors?.location && typeof state.errors.location === 'object' && state.errors.location.address && (*/}
                        {/*    <p id="address-error" className={classes.error}>*/}
                        {/*        {state.errors.location?.address[0]}*/}
                        {/*    </p>*/}
                        {/*)}*/}
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
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                aria-describedby="roomNumber-error"
                            />
                        </div>
                        {/*{state.errors?.location && typeof state.errors.location === 'object' && state.errors.location.roomNumber && (*/}
                        {/*    <p id="roomNumber-error" className={classes.error}>*/}
                        {/*        {state.errors.location.roomNumber[0]}*/}
                        {/*    </p>*/}
                        {/*)}*/}
                    </div>
                )}

                <div className={classes.buttonGroup}>
                    <Link className={classes.cancelButton} href="/dashboard/pnms">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className={classes.submitButton}
                        disabled={isPending}
                    >
                        {isPending ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </form>
    );

}