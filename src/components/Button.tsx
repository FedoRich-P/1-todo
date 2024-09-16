import {ComponentProps} from "react";

type MyButtonProps = {

}& ComponentProps<'button'>

export const MyButton = (props: MyButtonProps) => {
    const{children, ...allProps} = props;
    return (
        <button style={{marginLeft:'10px'}} {...allProps}>{children}</button>
    );
};