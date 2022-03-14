import jwtDecode from "jwt-decode";

function CheckJwtToken(){
    function CheckToken(){
        let jwtToken = window.localStorage.getItem("jwtToken");
        if(jwtToken){
            let token = jwtDecode(jwtToken);
            const currentTime = Date.now()/1000;

            if(token.exp<currentTime){
                window.localStorage.removeItem("jwtToken");
                return false;
            }else{
                return true;
            };
        }else{
            return false;
        };
    };
    return {CheckToken}
};


export default CheckJwtToken;