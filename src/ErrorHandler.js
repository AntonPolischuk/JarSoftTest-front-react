
class ErrorHandler{

    updateErrorHandler(error){
    let message='';

    if (error.response.data.response !== undefined) {
        message = error.response.data.response;
    }
    else if (error.response.data.errors !== undefined) {
        error.response.data.errors.forEach(function (item, i, arr) {
            message += item.defaultMessage+" ";
        });
    }
    else {
        message = error.response.data.error + ": please try again";
    }

    return message;
}
} export default new ErrorHandler()



