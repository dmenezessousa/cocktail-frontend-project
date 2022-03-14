import {useState, useEffect} from "react";
import {isAlpha} from "validator";

function FirstNameValidator(){
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");
    const [firstNameOnFocus, setFirstNameOnFocus] = useState(false);
    const [firstNameOnBlur, setFirstNameOnBlur] = useState(false);

    useEffect(() => {
        if(firstNameOnFocus){
            if(firstName.length > 0){
                if(!isAlpha(firstName)){
                    setError("Cannot have char or #")
                };

                if(isAlpha(firstName)){
                    setError("")
                };
            };
        };

        if(firstNameOnBlur){
            if(firstName.length === 0){
                setError("First Name cannot be empty")
            }
        };
    }, [firstName, firstNameOnFocus, firstNameOnBlur]);

    function handlefirstNameOnChange(e){
        setFirstName(e.target.value)
    };

    return [firstName, handlefirstNameOnChange, error, setFirstNameOnFocus, setFirstNameOnBlur];
};

export default FirstNameValidator;