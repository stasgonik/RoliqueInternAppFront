import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import blogSmall from "../../img/Social_Icons/Stories.svg";
import classes from './Campaigns_List.module.css';
import facebookIcon from "../../img/Social_Icons/Facebook.svg";
import instagramIcon from "../../img/Social_Icons/Instagram.svg";
import loading from "../../img/Loading.gif";
import path from '../Items/Icons/path.svg';
import photoDefault from '../Items/Icons/vector.svg';
import rightArrow from '../Items/Icons/right-arrow.svg';
import routes from "../../Constants/routes.enum";
import Search from "../Items/Search/Search";
import Sidebar from '../Items/Sidebar/Sidebar'
import tikTokIcon from "../../img/Social_Icons/TikTok.svg";
import twitterIcon from "../../img/Social_Icons/Twitter.svg";
import UsersListHeader from "../Items/UsersListHeader/UsersListHeader";
import youtubeIcon from "../../img/Social_Icons/Youtube.svg";
import arrows from "../Items/Icons/arrows.svg"
import CampaignFilterDropdown from "../Items/CampaignFilterDropdown/CampaignFilterDropdown";
import UserService from "../../Services/userService";
import CampaignService from "../../Services/campaign.service";
import BrandService from "../../Services/brand.service";

let status = [
    {
        value: 'Requested',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#D9AD42',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Requested </div>
    },
    {
        value: 'Pre-phase',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#B14AC2',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Pre-phase</div>
    },
    {
        value: 'Running',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#1778B0',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Running </div>
    },
    {
        value: 'Done',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#54A880',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Done </div>
    }
];

let effort = [
    {
        value: 'NotSet',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#FFFFFF',
                border: '1px solid #CCCCCC',
                boxSizing: 'border-box',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Not set </div>
    },
    {
        value: 'Low',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#5DC983',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Low</div>
    },
    {
        value: 'Medium',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#FBA63C',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            Medium </div>
    },
    {
        value: 'High',
        label: <div style={{display: "flex", alignItems: "center"}}>
            <div style={{
                height: "10px",
                width: "10px",
                backgroundColor: '#ED6B3E',
                borderRadius: '50%',
                marginRight: '4px'
            }}/>
            High </div>
    }
];


const Campaigns_List = () => {

    const [TL, setTL] = useState([]);
    const [brands, setBrands] = useState([]);
    const [sort, setSort] = useState({});
    const [filters, setFilters] = useState({});
    const [counter, setCounter] = useState(0)

    const [values, setValues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initial, setInitial] = useState(true);

    const sortByTitle = (preserve = false) => {
        if (!preserve) {
            setIsLoading(true);
        }

        if (!values.length) {
            setIsLoading(false);
            return;
        }

        if (!sort.field || sort.field !== 'title' ||
            (sort.field === 'title' && ((sort.normalOrder && preserve) || (!sort.normalOrder && !preserve)))) {
            const newSort = {field: 'title', normalOrder: true};
            const sorted = values.sort(function (a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                }
            )
            setValues(sorted);
            setSort(newSort);
            setIsLoading(false);
            return;
        }

        if (sort.field === 'title' && ((!sort.normalOrder && preserve) || (sort.normalOrder && !preserve))) {
            const newSort = {field: 'title', normalOrder: false}
            const sorted = values.sort(function (a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                    }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }
            )
            setValues(sorted);
            setSort(newSort);
            setIsLoading(false);
        }
    }

    const sortByBrand = (preserve = false) => {
        if (!preserve) {
            setIsLoading(true)
        }

        if (!values.length) {
            setIsLoading(false);
            return;
        }

        if (!sort.field || sort.field !== 'brand' ||
            (sort.field === 'brand' && ((sort.normalOrder && preserve) || (!sort.normalOrder && !preserve)))) {
            const newSort = {field: 'brand', normalOrder: true}
            const sorted = values.sort(function (a, b) {
                    if (a.brand.name.toLowerCase() < b.brand.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.brand.name.toLowerCase() > b.brand.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
            return
        }

        if (sort.field === 'brand' && ((!sort.normalOrder && preserve) || (sort.normalOrder && !preserve))) {
            const newSort = {field: 'brand', normalOrder: false}
            const sorted = values.sort(function (a, b) {
                    if (a.brand.name.toLowerCase() < b.brand.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.brand.name.toLowerCase() > b.brand.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
        }
    }

    const sortByStart = (preserve = false) => {
        if (!preserve) {
            setIsLoading(true)
        }

        if (!values.length) {
            setIsLoading(false);
            return;
        }

        if (!sort.field || sort.field !== 'start_date' ||
            (sort.field === 'start_date' && ((sort.normalOrder && preserve) || (!sort.normalOrder && !preserve)))) {
            const newSort = {field: 'start_date', normalOrder: true}
            const sorted = values.sort(function (a, b) {
                    if (!a.start_date && b.start_date) {
                        return 1
                    }
                    if (!b.start_date && a.start_date) {
                        return -1
                    }
                    if (!a.start_date && !b.start_date) {
                        return 0
                    }
                    return a.start_date - b.start_date
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
            return;
        }

        if (sort.field === 'start_date' && ((!sort.normalOrder && preserve) || (sort.normalOrder && !preserve))) {
            const newSort = {field: 'start_date', normalOrder: true}
            const sorted = values.sort(function (a, b) {
                    if (!a.start_date && b.start_date) {
                        return 1
                    }
                    if (!b.start_date && a.start_date) {
                        return -1
                    }
                    if (!a.start_date && !b.start_date) {
                        return 0
                    }
                    return b.start_date - a.start_date
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
        }
    }

    const sortByEnd = (preserve = false) => {
        if (!preserve) {
            setIsLoading(true)
        }

        if (!values.length) {
            setIsLoading(false);
            return;
        }

        if (!sort.field || sort.field !== 'end_date' ||
            (sort.field === 'end_date' && ((sort.normalOrder && preserve) || (!sort.normalOrder && !preserve)))) {
            const newSort = {field: 'end_date', normalOrder: true}
            const sorted = values.sort(function (a, b) {
                    if (!a.end_date && b.end_date) {
                        return 1
                    }
                    if (!b.end_date && a.end_date) {
                        return -1
                    }
                    if (!a.end_date && !b.end_date) {
                        return 0
                    }
                    return a.end_date - b.end_date
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
            return;
        }

        if (sort.field === 'end_date' && ((!sort.normalOrder && preserve) || (sort.normalOrder && !preserve))) {

            const newSort = {field: 'end_date', normalOrder: true}
            const sorted = values.sort(function (a, b) {
                    if (!a.end_date && b.end_date) {
                        return 1
                    }
                    if (!b.end_date && a.end_date) {
                        return -1
                    }
                    if (!a.end_date && !b.end_date) {
                        return 0
                    }
                    return b.end_date - a.end_date
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
        }
    }

    const sortByBudget = (preserve = false) => {
        if (!preserve) {
            setIsLoading(true)
        }

        if (!values.length) {
            setIsLoading(false);
            return;
        }

        if (!sort.field || sort.field !== 'budget' ||
            (sort.field === 'budget' && ((sort.normalOrder && preserve) || (!sort.normalOrder && !preserve)))) {
            const newSort = {field: 'budget', normalOrder: true}
            const sorted = values.sort((a, b) => {
                    if ((!a.budget || typeof a.budget.totalBudget === 'undefined')
                        && (b.budget.totalBudget || b.budget.totalBudget === 0)) {
                        return 1
                    }
                    if ((!b.budget || typeof b.budget.totalBudget === 'undefined')
                        && (a.budget.totalBudget || a.budget.totalBudget === 0)) {
                        return -1
                    }
                    if ((!a.budget || typeof a.budget.totalBudget === 'undefined')
                        && (!b.budget || typeof b.budget.totalBudget === 'undefined')) {
                        return 0
                    }
                    return a.budget.totalBudget - b.budget.totalBudget;
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
            return;
        }

        if (sort.field === 'budget' && ((!sort.normalOrder && preserve) || (sort.normalOrder && !preserve))) {
            const newSort = {field: 'budget', normalOrder: false}
            const sorted = values.sort((a, b) => {
                    if ((!a.budget || typeof a.budget.totalBudget === 'undefined')
                        && (b.budget.totalBudget || b.budget.totalBudget === 0)) {
                        return 1
                    }
                    if ((!b.budget || typeof b.budget.totalBudget === 'undefined')
                        && (a.budget.totalBudget || a.budget.totalBudget === 0)) {
                        return -1
                    }
                    if ((!a.budget || typeof a.budget.totalBudget === 'undefined')
                        && (!b.budget || typeof b.budget.totalBudget === 'undefined')) {
                        return 0
                    }
                    return b.budget.totalBudget - a.budget.totalBudget;
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
        }
    }

    const sortByProfit = (preserve = false) => {
        if (!preserve) {
            setIsLoading(true)
        }

        if (!values.length) {
            setIsLoading(false);
            return;
        }

        if (!sort.field || sort.field !== 'profit' ||
            (sort.field === 'profit' && ((sort.normalOrder && preserve) || (!sort.normalOrder && !preserve)))) {
            const newSort = {field: 'profit', normalOrder: true}
            const sorted = values.sort((a, b) => {
                    return a.profit - b.profit;
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
            return;
        }

        if (sort.field === 'profit' && ((!sort.normalOrder && preserve) || (sort.normalOrder && !preserve))) {
            const newSort = {field: 'profit', normalOrder: false}
            const sorted = values.sort((a, b) => {
                    return b.profit - a.profit;
                }
            )
            setValues(sorted)
            setSort(newSort)
            setIsLoading(false)
        }
    }


    useEffect(() => {
        window.focus();
        window.scrollTo(0, 0);

        async function Start() {
            setInitial(false);
            setIsLoading(true);
            const initialState = await CampaignService.getCampaigns();
            if (initialState) {
                setValues(initialState.data);
                setCounter(initialState.count);
            }

            const initialTL = await UserService.getUsers({role: 'manager'});
            if (initialTL) {
                const arr = [];
                initialTL.forEach((user) => {
                    const tl = {value: user._id, label: user.full_name};
                    arr.push(tl);
                })
                setTL(arr);
            }

            const initialBrands = await BrandService.getBrands();
            if (initialBrands) {
                const arr = [];
                initialBrands.forEach((brand) => {
                    const br = {value: brand._id, label: brand.name};
                    arr.push(br);
                })
                setBrands(arr);
            }

            setIsLoading(false);
        }

        async function Filter() {
            setIsLoading(true);

            const filterState = await CampaignService.getCampaigns(filters);
            if (filterState) {
                setValues(filterState.data);
                setCounter(filterState.count);

                if (!filterState.data?.length || !sort.field) {
                    setIsLoading(false);
                } else {
                    if (sort.field === 'title') {
                        sortByTitle(true);
                        return;
                    }

                    if (sort.field === 'brand') {
                        sortByBrand(true);
                        return;
                    }

                    if (sort.field === 'start_date') {
                        sortByStart(true);
                        return;
                    }

                    if (sort.field === 'end_date') {
                        sortByEnd(true);
                        return;
                    }

                    if (sort.field === 'budget') {
                        sortByBudget(true);
                        return;
                    }

                    if (sort.field === 'profit') {
                        sortByProfit(true);
                    }
                }
            }
        }

        if (initial) {
            Start();
        } else {
            Filter();
        }
    }, [filters])

    const searchName = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setFilters({...filters, title: value});
    }

    const numberSearch = (e) => {
        e.preventDefault();
        const name = e.target.name;
        let value = +e.target.value;
        if (value < 1) {
            value = 0;
        }
        setFilters({...filters, [name]: value});
    }

    const selectSearch = (name, value) => {
        let f = filters;
        if (value === '') {
            delete f[name];
        } else {
            f[name] = value;
        }
        setFilters(f);
    }


    const tlDiv = (first, last) => {
        const colors = ['#FBA63C', '#5DC983', '#7784EE', '#D459E8'];
        const color = colors[Math.floor(Math.random() * 4)];

        const firstL = first.charAt(0);
        const lastL = last.charAt(0);


        return (
            <div style={{
                width: '32px',
                height: '32px',
                textTransform: 'uppercase',
                borderRadius: '50%',
                backgroundColor: color,
                color: 'white',
                textAlign: 'center',
                verticalAlign: 'middle',
                fontSize: '12px',
                display: 'table-cell'
            }}>
                {firstL}{lastL}
            </div>
        )
    }

    const dateBar = (start, end) => {
        const total = end - start;
        const now = new Date();
        let length = '0';
        if (now > end) {
            length = '180px';
        }
        if (now > start && now < end) {
            const nowDiff = now - start;
            const per = nowDiff / total;
            const number = Math.round(per * 180);
            length = number + 'px';
        }

        return (
            <div style={{position: "relative", width: 0, height: 0, zIndex: -10}}>
                <div style={{backgroundColor: "#D6EDE2", height: '26px', width: length, zIndex: -10}}/>
            </div>

        )

    }
// const socials = (item) => {
//     const social = [];
//     if (item.social_profiles.length) {
//         item.social_profiles.forEach((profile) => {
//             social.push(profile.social_network_name)
//         })
//     }
//     return social
// }

    return (
        <div className={classes.mainContainer}>
            <Sidebar/>
            <UsersListHeader titleHeader={classes.titleUsers}
                             title={initial ? '' : 'Campaigns'}
                             titleBtn='Create New'
                             upArrow={arrowUp}
                             btnHeader={classes.btnHeader}

            />


            <div className={classes.centerContainer}>
                <section>
                    <div className={classes.LeftSection}>
                        <div className={classes.FilterContainer}>
                            <span className={classes.TitleFilters}>Filters</span>
                            <div className={classes.NumberCamp}>{counter}</div>
                        </div>

                        <div className={classes.SearchContainer}>
                            <Search
                                widthSearch={classes.widthSearch}
                                placeholder={"Search by title..."}
                                // onChangeName={(e) => searchName(e)}
                                // Временно закоментировано до создания всего необходимого на беке
                            />
                        </div>

                        <div className={classes.Channels}>
                            <span className={classes.ChannelsColorText}>Planned channels</span>
                            <div className={classes.ChannelsIcon}>
                                <img src={instagramIcon} alt="logo"/>
                                <img src={twitterIcon} alt="logo"/>
                                <img src={youtubeIcon} alt="logo"/>
                                <img src={facebookIcon} alt="logo"/>
                                <img src={tikTokIcon} alt="logo"/>
                                <img src={blogSmall} alt="logo"/>
                            </div>
                        </div>

                        <div className={classes.LeftContainerFilter}>
                            <span className={`${classes.ChannelsColorText}`}>Brand</span>
                            <CampaignFilterDropdown options={brands}
                                                    name={'_brand'}
                                                    onChange={selectSearch}/>
                        </div>

                        <div className={classes.LeftContainerFilter}>
                            <span className={`${classes.ChannelsColorText}`}>Effort</span>
                            <CampaignFilterDropdown options={effort}
                                                    name={'effort'}
                                                    onChange={selectSearch}/>
                        </div>

                        <div className={classes.LeftContainerFilter}>
                            <span className={`${classes.ChannelsColorText}`}>Status</span>
                            <CampaignFilterDropdown options={status}
                                                    name={'status'}
                                                    onChange={selectSearch}/>
                        </div>

                        <div className={classes.LeftContainerFilter}>
                            <span className={`${classes.ChannelsColorText}`}>TL</span>
                            <CampaignFilterDropdown options={TL}
                                                    name={'_team_lead'}
                                                    onChange={selectSearch}/>
                        </div>


                        <div className={classes.LeftContainerFilter}>
                            <span className={classes.ChannelsColorText}>Budget</span>
                            <div className={classes.BudgetInput}>
                                <input type={'number'} min="0" placeholder={'Min'}
                                       name={'budget_LTE'}
                                    // onInput={(e) => numberSearch(e)}
                                />
                                <span> – </span>
                                <input type={'number'} min="0" placeholder={'Max'}
                                       name={'budget_GTE'}
                                    // onInput={(e) => numberSearch(e)}
                                />
                            </div>
                        </div>

                        <div className={classes.LeftContainerFilter}>
                            <span className={classes.ChannelsColorText}>Profit</span>
                            <div className={classes.BudgetInput}>
                                <input type={'number'} min="0" placeholder={'Min'}
                                       name={'profit_LTE'}
                                    // onInput={(e) => numberSearch(e)}
                                />
                                <span> – </span>
                                <input type={'number'} min="0" placeholder={'Max'}
                                       name={'profit_GTE'}
                                    // onInput={(e) => numberSearch(e)}
                                />
                            </div>
                        </div>

                    </div>

                </section>

                <section>
                    <div className={classes.RightSection}>

                        <div className={classes.TableHeader}>
                            <div className={`${classes.TitleTableHeader} ${classes.HeaderField}`}>
                                <span>Campaign Title</span>
                                <button>
                                    <img src={arrows} alt="arrows"/>
                                </button>

                            </div>

                            <div className={`${classes.BrandTableHeader} ${classes.HeaderField}`}>
                                <span>Brand</span>
                                <button>
                                    <img src={arrows} alt="arrows"/>
                                </button>

                            </div>

                            <div className={`${classes.StartTableHeader} ${classes.HeaderField}`}>
                                <span>Start</span>
                                <button>
                                    <img src={arrows} alt="arrows"/>
                                </button>

                            </div>

                            <div className={`${classes.EndTableHeader} ${classes.HeaderField}`}>
                                <span>End</span>
                                <button>
                                    <img src={arrows} alt="arrows"/>
                                </button>

                            </div>

                            <div className={`${classes.StatusTableHeader} ${classes.HeaderField}`}>
                                <span>Status</span>
                            </div>

                            <div className={`${classes.TLTableHeader} ${classes.HeaderField}`}>
                                <span>TL</span>
                            </div>


                            <div className={`${classes.BudgetTableHeader} ${classes.HeaderField}`}>
                                <span>Budget</span>
                                <button>
                                    <img src={arrows} alt="arrows"/>
                                </button>

                            </div>


                            <div className={`${classes.ProfitTableHeader} ${classes.HeaderField}`}>
                                <span>Profit</span>
                                <button>
                                    <img src={arrows} alt="arrows"/>
                                </button>

                            </div>
                        </div>

                    </div>

                    <div>
                        {isLoading ?
                            <div style={{textAlign: "center", fontSize: "18px", fontWeight: "700", marginTop: "30px"}}>
                                <img style={{margin: "20px auto", width: "50px"}} alt="Loading" src={loading}/>
                                <p>Please wait...</p>
                            </div> : ''}
                    </div>
                    {/*            : values ? (values.map((item, index) =>*/}
                    {/*                <div key={index}>*/}
                    {/*                    <div className={`${classes.tableHeaderInfo}`}>*/}
                    {/*                        {item.profile_picture ?*/}
                    {/*                            <img src={`${item.profile_picture}`} alt='avatar' className={classes.avatar}/> :*/}
                    {/*                            <img src={photoDefault} alt='photoDefault'*/}
                    {/*                                 className={`${classes.avatar} ${classes.photo}`}/>}*/}

                    {/*                        <div className={classes.tableTextName}><p*/}
                    {/*                            className={classes.textColor}>{item.user_name} </p></div>*/}

                    {/*                        <div className={classes.tableTextEmail}><p*/}
                    {/*                            className={classes.textColor}>{item.full_name}</p></div>*/}
                    {/*                        <div className={classes.tableTextRole}><p className={classes.textColor}>*/}
                    {/*                            {socials(item).includes('instagram') ?*/}
                    {/*                                <img alt='instagram' className={classes.social_img}*/}
                    {/*                                     src={instagramIcon}/> : ''}*/}

                    {/*                            {socials(item).includes('youtube') ?*/}
                    {/*                                <img alt='youtube' className={classes.social_img} src={youtubeIcon}/> : ''}*/}

                    {/*                            {socials(item).includes('facebook') ?*/}
                    {/*                                <img alt='facebook' className={classes.social_img}*/}
                    {/*                                     src={facebookIcon}/> : ''}*/}

                    {/*                            {socials(item).includes('tiktok') ?*/}
                    {/*                                <img alt='tiktok' className={classes.social_img} src={tikTokIcon}/> : ''}*/}

                    {/*                            {socials(item).includes('twitter') ?*/}
                    {/*                                <img alt='twitter' className={classes.social_img} src={twitterIcon}/> : ''}*/}

                    {/*                            {socials(item).includes('blog') ?*/}
                    {/*                                <img alt='blog' className={classes.social_img} src={blogSmall}/> : ''}*/}
                    {/*                        </p></div>*/}
                    {/*                        <div className={classes.tableTextRating}><p className={classes.textColor}>SUPER!</p>*/}
                    {/*                        </div>*/}

                    {/*                        <></>*/}

                    {/*                        <Link to={`${routes.INFLUENCERS}/${item._id}`}>*/}
                    {/*                            <div className={classes.tableBtn}>*/}
                    {/*                                <div className={classes.Test}>*/}
                    {/*                                    <div className={classes.btnPosition}>*/}
                    {/*                                        <img src={path} alt='path' className={classes.infoBtn}/>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                                <div className={classes.tooltipMain}>*/}
                    {/*                                    <div className={classes.TooltipText}>*/}
                    {/*                                        <p>Show Influencer</p></div>*/}
                    {/*                                </div>*/}
                    {/*                                <img className={classes.ArrowImg} src={rightArrow} alt={'Right arrow'}/>*/}
                    {/*                            </div>*/}
                    {/*                        </Link>*/}


                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            )) : ''}*/}
                    {/*        }*/}
                    {/*    </div>*/}
                </section>
            </div>
        </div>
    )
}

export default Campaigns_List;
