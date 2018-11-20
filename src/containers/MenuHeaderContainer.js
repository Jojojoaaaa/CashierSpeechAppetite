import React, {Component}from 'react';
/// to be changed into component
class MenuHeaderContainer extends Component{
   constructor(props) {
    super(props);
   }

    render() {
        const {
            handleFilterClick,
            filter_button_class
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
                    className={'class-mo-mae '+filter_button_class}                
                    onClick={() => handleFilterClick()}>FILTERS</button>
            </div>
        )
    }
}

export default MenuHeaderContainer;