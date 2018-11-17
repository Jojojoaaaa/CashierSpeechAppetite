import React, {Component}from 'react';

class MenuHeaderContainer extends Component{
   constructor(props) {
    super(props);
   }

   render() {
       return (
        <div>
            Menu
            <input 
                type='text'
                placeholder='Enter Value'/>
            <button>FIND</button>
            <button>Add New</button>
        </div>
       )
   }
}

export default MenuHeaderContainer;