export function submitAction(data) {
    console.log(data)
    const SUBMIT ='SUBMIT';
    return {
      type: SUBMIT,
       payload:data
    };
  }