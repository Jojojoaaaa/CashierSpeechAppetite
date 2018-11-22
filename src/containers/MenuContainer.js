import React, {Component}from 'react';
import {withRouter} from 'react-router-dom';

import MenuHeaderComponent from '../components/MenuHeaderComponent';
import MenuCardContainer from '../containers/MenuCardContainer'
import FilterComponent from '../components/FilterComponent';

import '../styles/MenuStyles.css';

import axios from '../axios';
import * as url from '../constants/urls';


class MenuContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menu: [],
            categories: [],
            category_filters: [],
            filter_visible: false,
        }
    }

    componentDidMount() {
        this.retrieveAllMenu();
    }
    retrieveAllMenu = () => {
        axios.get(url.RETRIEVE_ALL_MENU_AND_CATEGORY)
            .then(response => {
                this.setState({
                    menu: response.data.menu,
                    categories: response.data.category});
            })
            .catch(error => {
                alert(error.message);
            })
    }
    handleFilterClick = () => {
        const {filter_visible} = this.state;
        this.setState({
                filter_visible: !filter_visible
            });
    }
    handleCategoryClick = (category) => {
        let category_filters = [...this.state.category_filters];
        if (category_filters.includes(category)) {
            // arr = arr.filter(item => item !== value)
            category_filters = category_filters.filter(c => c !== category);
            this.setState({category_filters: category_filters});
            console.log('remove',category_filters);
        }
        else {
            category_filters = [...category_filters, category];
            this.setState({category_filters: category_filters});
            console.log('new',category_filters);
        }
    }
    render() {
        const {
                menu,
                categories,
                filter_visible
            } = this.state;

        const handleFilterClick = this.handleFilterClick;
        const handleCategoryClick = this.handleCategoryClick;

        const filter_class = (filter_visible) ? '' : 'hide';
        const filter_button_class = (filter_visible) ? 'hide' : '';
        const menu_cards = (
                menu 
                ?
                menu.map(m => (
                    <MenuCardContainer 
                    key={m.id} 
                    id={m.id}
                    categories={categories}/>
                    )
                )
                : 
                null
            );
        return (
            <div className='menu-container'>
                <div className='menu-content'>
                    <div className='menu-header'>
                        <MenuHeaderComponent
                            handleFilterClick={handleFilterClick}
                            filter_button_class={filter_button_class}/>                
                    </div>
                    <div className='menu-cards'>
                    {menu_cards}
                    </div>
                </div>
                <div className={'menu-filter '+filter_class}>
                    <FilterComponent
                        handleFilterClick={handleFilterClick}
                        categories={categories}
                        handleCategoryClick={handleCategoryClick}/>
                </div>
            </div>

        )
    }
}

export default withRouter(MenuContainer);