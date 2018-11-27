import React, {Component}from 'react';
import {withRouter} from 'react-router-dom';

import MenuHeaderComponent from '../components/MenuHeaderComponent';
import MenuCardContainer from '../containers/MenuCardContainer'
import AddNewMenuContainer from '../containers/AddNewMenuContainer';
import FilterComponent from '../components/FilterComponent';
import ModalComponent from '../components/ModalComponent';

import '../styles/MenuStyles.css';

import axios from '../axios';
import * as url from '../constants/urls';
import * as type from '../constants/type';

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
            add_menu: false,
            show_modal: false,
            modal_type: '',
            modal_message: '',
            sort_by: ''
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
                this.setState({
                    show_modal: true,
                    modal_type: type.ERROR,
                    modal_message: type.PRE_ERROR_MESSAGE + error.message + type.POST_ERROR_MESSAGE
                })
            })
    }
    handleCloseModal = () => {
        this.setState({
            show_modal: false
        });
    }
    groupMenu = () => {
        const {categories, menu} = this.state;
        let menu_grouped = {};
        categories.forEach(category => {
            menu_grouped[category] = menu.filter(m => m.category === category);
        });
        this.setState({menu_grouped: menu_grouped});
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
            sort_by: 'name',
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
            sort_by: 'price',
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
            sort_by: 'servings',
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
            this.setState({menu_display: menu});
        }
    }
    handleSearchQueryChange = (search_query) => {
        if (search_query === '') {
            this.handleApplyFiltersClick();
        }
        else {
            const {menu_display} = this.state;
            var match = new RegExp(search_query, 'i');

            const filtered_menu = menu_display.filter(menu => match.test(menu.name));
            this.setState({menu_display: filtered_menu});
        }
    };
    handleAddMenuClick = () => {
        this.setState({add_menu: true});
    }
    handleCancelAdd = () => {
        this.setState({add_menu:false})
    }
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
        if (a.price > b.price)
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
                filter_visible, 
                add_menu,
                show_modal,
                modal_type,
                modal_message,
                sort_by
            } = this.state;

        const handleFilterClick = this.handleFilterClick;
        const handleCategoryClick = this.handleCategoryClick;
        const handleMenuSortName = this.handleMenuSortName;
        const handleMenuSortPrice = this.handleMenuSortPrice;
        const handleMenuSortServings = this.handleMenuSortServings;
        const handleApplyFiltersClick = this.handleApplyFiltersClick;
        const handleSearchQueryChange = this.handleSearchQueryChange;
        const handleAddMenuClick = this.handleAddMenuClick;
        const handleCancelAdd = this.handleCancelAdd;
        const handleCloseModal = this.handleCloseModal;
        const retrieveAllMenu = this.retrieveAllMenu;

        const filter_class = (filter_visible) ? '' : 'hide';
        const menu_cards = (
                menu_display 
                ?
                menu_display.map(m => (
                    <MenuCardContainer 
                    key={m.id} 
                    id={m.id}
                    categories={categories}
                    refresh={retrieveAllMenu}/>
                    )
                )
                : 
                null
            );
        const modal = (
            show_modal
                ?
                    <ModalComponent
                        modal_type={modal_type}
                        modal_message={modal_message}
                        handleClick={handleCloseModal}/>
                :
                null
        );
        return (
            <div className='menu-container'>
                <div className='menu-content'>
                    <div className='menu-header'>
                        <MenuHeaderComponent
                            add_menu={add_menu}
                            filter_visible={filter_visible}
                            handleFilterClick={handleFilterClick}
                            handleSearchQueryChange={handleSearchQueryChange}
                            handleAddMenuClick={handleAddMenuClick}
                            />                
                    </div>
                    <div className='menu-cards'>
                    {modal}
                    {add_menu
                        ? 
                        (<AddNewMenuContainer
                            categories={categories}
                            handleCancelAdd={handleCancelAdd}
                            retrieveAllMenu={retrieveAllMenu}/>)
                        :
                        null
                    }
                    {menu_cards}
                    </div>
                </div>
                <div className={'menu-filter ' +filter_class}>
                    <FilterComponent
                    handleFilterClick={handleFilterClick}
                    categories={categories}
                    handleCategoryClick={handleCategoryClick}
                    handleMenuSortName={handleMenuSortName}
                    handleMenuSortPrice={handleMenuSortPrice}
                    handleMenuSortServings={handleMenuSortServings}
                    handleApplyFiltersClick={handleApplyFiltersClick}
                    sort_by={sort_by}
                    />
                </div>
            </div>

        )
    }
}

export default withRouter(MenuContainer);