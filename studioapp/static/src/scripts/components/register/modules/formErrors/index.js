import React, { Component } from 'react';

class FormErrors extends Component {
  constructor(props) {
    super(props);   
  } 
  render(){
    const formErrors = this.props.formErrors;
    return(
      <ul className="list-group">
        {Object.keys(formErrors).map((fieldName, index) => {
          if(formErrors[fieldName].length > 0){
            return (
              <li key={index} className="list-group-item list-group-item-danger">
                {fieldName} {formErrors[fieldName]}
              </li>              
            )        
          } else {
            return '';
          }
        })}
      </ul>
    )
  }
}


export default FormErrors;

//   https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs