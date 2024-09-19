import {ChangeEvent, ComponentProps, useState} from "react";
import {MyButton} from "./Button";

type EditableSpanProps = {
    value: string;
    onChange: (title: string) => void
}

export const EditableSpan = (props: EditableSpanProps) => {
    const {value, onChange} = props

    const [spanToInput, setSpanToInput] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(value);

    const activateEditModeHandler = () => {
        setSpanToInput(!spanToInput)
        onChange(inputValue)
    }

    const changeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    return (
        <>
            {spanToInput ?
                <input
                    onBlur={activateEditModeHandler}
                    onChange={changeInputValueHandler}
                    value={inputValue}
                    autoFocus
                    type="text"
                /> :
                <span
                    onDoubleClick={activateEditModeHandler}
                >{inputValue}</span>}

            {/*<MyButton*/}
            {/*    onClick={activateEditModeHandler}*/}
            {/*>*/}
            {/*    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*        <g opacity="0.7" clipPath="url(#clip0_224_1347)">*/}
            {/*            <path*/}
            {/*                d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z"*/}
            {/*                fill="#34C759"/>*/}
            {/*        </g>*/}
            {/*        <defs>*/}
            {/*            <clipPath id="clip0_224_1347">*/}
            {/*                <rect width="16" height="16" fill="white"/>*/}
            {/*            </clipPath>*/}
            {/*        </defs>*/}
            {/*    </svg>*/}

            {/*</MyButton>*/}
        </>
    )
        ;
};