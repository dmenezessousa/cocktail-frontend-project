import {useState, useEffect} from "react";
import {isEmpty, isStrongPassword} from "validator";


function PasswordValidator() {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const [pwOnFocus, setPwOnFocus] = useState(false);
    const [pwOnBlur, setPwOnBlur] = useState(false);

    useEffect(() => {
        if(pwOnFocus){
            if(password.length > 0){
                if(!isStrongPassword(password,{
                    minLengh: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbol: 1,
                })
                ){
                    setPasswordError("Password is not Good");
                }

                if(isStrongPassword(password,{
                    minLengh: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbol: 1,
                })
                ){
                    setPasswordError("Password is Good");
                }
                
            }
        }

        if(pwOnBlur){
            if(isEmpty(password)){
                setPasswordError("Password cannot be empty")
            }
        }
    }, [password, pwOnFocus, pwOnBlur]);

    function handlePwOnChange(e){
        setPassword(e.target.value);
    }
    return [password, handlePwOnChange, passwordError, setPwOnFocus, setPwOnBlur];
}

export default PasswordValidator
