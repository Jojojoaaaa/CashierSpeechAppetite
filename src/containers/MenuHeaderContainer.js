import React, {Component}from 'react';
/// to be changed into component
class MenuHeaderContainer extends Component{
   constructor(props) {
    super(props);
   }

    render() {
        const {
            handleOpenFilter,
            filter_button_display
        }  = this.props; 
        return (
            <div>
                Menu
                <input 
                    type='text'
                    placeholder='Enter Value'/>
                <button>FIND</button>
                <button>Add New</button>
                <button 
                    style={filter_button_display}                
                    onClick={() => handleOpenFilter()}>FILTERS</button>
            </div>
        )
    }
}

export default MenuHeaderContainer;