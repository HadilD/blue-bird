import { actions } from '../redux/slice/error'
import store from '../redux/store/store'

export const handleAPIError = (errorValue = {}, errorMessage="Something went wrong") => {
  try{
    const statusCode = errorValue?.response?.status;

    let defaultErrorDialog = {
      message: errorMessage,
      title: 'Alert',
    }
    let errorDialog = {}
    
    switch(statusCode){
      case 500:
        // This is kept for development only, once in prod change the message to standard error messages like: Something went wrong
        errorDialog = {...defaultErrorDialog, message: errorValue?.response?.data?.error}
        break;
      case 404:
        errorDialog = {...defaultErrorDialog, message: 'Requested resource not found'}
        break;      
      default:
        errorDialog = {...defaultErrorDialog};
    }

    store.dispatch(actions.showError(errorDialog));
  }catch(err){
    console.log(err)
  }
}