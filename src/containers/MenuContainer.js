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
            menu_grouped: {},
            menu_display: [],
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
                    menu_display: response.data.menu,
                    categories: response.data.category},
                    () => this.groupMenu());
            })
            .catch(error => {
                alert(error.message);
            })
    }
    groupMenu = () => {
        const {categories, menu} = this.state;
        let menu_grouped = {};
        categories.forEach(category => {
            menu_grouped[category] = menu.filter(m => m.category === category);
        });
        this.setState({menu_grouped: menu_grouped});
        console.log(menu_grouped);
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
            category_filters = category_filters.filter(c => c !== category);
            this.setState({category_filters: category_filters});
        }
        else {
            category_filters = [...category_filters, category];
            this.setState({category_filters: category_filters});
        }
    }
    handleMenuSortName = () => {
        let menu_display = [...this.state.menu_display];
        menu_display.sort(this.sortName);
        let menu = [...this.state.menu];
        menu.sort(this.sortName);
        this.setState({
            menu_display: menu_display,
            menu: menu},
            () => this.groupMenu());
    }
    handleMenuSortPrice = () => {
        let menu_display = [...this.state.menu_display];
        menu_display.sort(this.sortPrice);
        let menu = [...this.state.menu];
        menu.sort(this.sortPrice);
        this.setState({
            menu_display: menu_display,
            menu: menu},
            () => this.groupMenu());
    }
    handleMenuSortServings =() => {
        let menu_display = [...this.state.menu_display];
        menu_display.sort(this.sortServings);
        let menu = [...this.state.menu];
        menu.sort(this.sortServings);
        this.setState({
            menu_display: menu_display,
            menu: menu},
            () => this.groupMenu());
    }
    handleApplyFiltersClick = () => {
        const {
            category_filters, 
            menu, 
            menu_grouped} = this.state;

        if (category_filters[0]) {
            let filtered_menu = [];
            category_filters.forEach(category => {
                //const fil_men =  menu_display.filter(menu => menu.category === category);
                filtered_menu = [...filtered_menu, ...menu_grouped[category]];
            });
            this.setState({menu_display: filtered_menu})
        }
        else {
            const {menu} = this.state;
            this.setState({menu_display: menu});
        }
    }
    handleSearchQueryChange = (search_query) => {
        if (search_query === '') {
            this.handleApplyFiltersClick();
        }
        else {
            const {menu_display} = this.state;
            const filtered_menu = menu_display.filter(menu => menu.name.includes(search_query));
            this.setState({menu_display: filtered_menu});
        }
    };
    sortName = (a, b) => {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }
    sortPrice = (a, b) => {
        if (a.price < b.price)
            return -1;
        if (a.price > b.prie)
            return 1;
        return 0;
    }
    sortServings = (a, b) => {
        if (a.servings < b.servings)
            return -1;
        if (a.servings > b.servings)
            return 1;
        return 0;
    }
    render() {
        const {
                menu_display,
                categories,
                filter_visible
            } = this.state;

        const handleFilterClick = this.handleFilterClick;
        const handleCategoryClick = this.handleCategoryClick;
        const handleMenuSortName = this.handleMenuSortName;
        const handleMenuSortPrice = this.handleMenuSortPrice;
        const handleMenuSortServings = this.handleMenuSortServings;
        const handleApplyFiltersClick = this.handleApplyFiltersClick;
        const handleSearchQueryChange = this.handleSearchQueryChange;

        const filter_class = (filter_visible) ? '' : 'hide';
        const filter_button_class = (filter_visible) ? 'hide' : 'btn-filter';
        const menu_cards = (
                menu_display 
                ?
                menu_display.map(m => (
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
                            filter_button_class={filter_button_class}
                            handleSearchQueryChange={handleSearchQueryChange}
                            />                
                    </div>
                    <div className='menu-cards'>
                    {menu_cards}
                    </div>
                </div>
                <div className={'menu-filter '+filter_class}>
                    <FilterComponent
                        handleFilterClick={handleFilterClick}
                        categories={categories}
                        handleCategoryClick={handleCategoryClick}
                        handleMenuSortName={handleMenuSortName}
                        handleMenuSortPrice={handleMenuSortPrice}
                        handleMenuSortServings={handleMenuSortServings}
                        handleApplyFiltersClick={handleApplyFiltersClick}
                        />
                </div>
            </div>

        )
    }
}

export default withRouter(MenuContainer);