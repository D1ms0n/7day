import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, index) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={index}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
  
//   https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs