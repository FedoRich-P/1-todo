import {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react";
import {MyButton} from "./Button";

type AddItemFormPropsType = {
    addItem: (inputValue: string) => void;

}
export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState<boolean>(false);

    const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        if (value !== '')  {
            setInputError(false)
            setInputValue(value.trimStart())
        }
    }

    const addItemHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(inputValue !== '') {
            addItem(inputValue);
            setInputValue('')
        } else {
            setInputError(true);
        }

    }

    return (
        <form>
            <input
                value={inputValue}
                onChange={getInputValue}
                className={inputError ? 'error' : ''}
            />
            <MyButton
                onClick={addItemHandler}
            >Add</MyButton>
            {inputError ? <div className={'errorMessage'}>Add task</div> : null}
        </form>
    )
}