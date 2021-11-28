exports.status = {
    Failed:"Failed",
    Successful: "Successful"
}

exports.message = {
    SomethingWentWrong: "Oops! something went wrong.",
    EntityNotFound: "Entity not found",
    EntityNotSaved: "Entity not saved",
    ServeError: "Internal Server Error",
    AuthenticationFailed: "Authentication Failed",
    WrongPassword: "Wrong password",
    UsernameExists: "Username already exists.",
    EmailExists: "Email id already in use.",
    Unauthorised: "You are not allow to access this information."
}

exports.statusCode = {
    StatusOk : 200,
    StatusBadRequest: 403,
    StatusUnauthorized: 401,
    StatusNotFound : 404,
    StatusInternalServerError: 500
}

exports.response = (res, status, message, data, statusCode) =>{
    let response = {
        status : status,
        message : message,
        data : data
    }
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
    return res;
}