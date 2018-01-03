import React, { Component } from 'react';

class FormErrors extends Component {
  constructor(props) {
    super(props);   
  } 
  render(){
    const formErrors = this.props.formErrors;
    return(
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
    )
  }
}


export default FormErrors;

//   https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs