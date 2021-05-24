import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import arrowUp from '../Items/Icons/arrow-up.svg'
import blogSmall from "../../img/Social_Icons/Stories.svg";
import classes from './Campaigns_List.module.css';
import facebookIcon from "../../img/Social_Icons/Facebook.svg";
import InfluencersService from "../../Services/influencers.service";
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

let status = [
    {value: 'Requested', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#D9AD42', borderRadius:'50%', marginRight:'4px'}} />Requested </div>},
    {value: 'Pre-phase', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#B14AC2', borderRadius:'50%', marginRight:'4px'}} />Pre-phase</div>},
    {value: 'Running', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#1778B0', borderRadius:'50%', marginRight:'4px'}} /> Running </div>},
    {value: 'Done', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#54A880', borderRadius:'50%', marginRight:'4px'}} /> Done </div>}
];

let effort = [
    {value: 'NotSet', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC', boxSizing: 'border-box',  borderRadius:'50%', marginRight:'4px'}} />Not set </div>},
    {value: 'Low', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#5DC983', borderRadius:'50%', marginRight:'4px'}} />Low</div>},
    {value: 'Medium', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#FBA63C', borderRadius:'50%', marginRight:'4px'}} /> Medium </div>},
    {value: 'High', label: <div style={{display: "flex", alignItems: "center"}}><div style={{height: "10px", width: "10px", backgroundColor: '#ED6B3E', borderRadius:'50%', marginRight:'4px'}} /> High </div>}
];


const Campaigns_List = () => {

    const [TL, setTL] = useState([])

    const [values, setValues] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initial, setInitial] = useState(true);

    useEffect(() => {
        async function Start() {
            setInitial(false)
            setIsLoading(true)
            const initialState = await UserService.getUsers({role: 'manager'})
            if (initialState) {
                const arr = [];
                initialState.forEach((user) => {
                    const tl = { value: user._id, label: user.full_name}
                    arr.push(tl)
                })
                setTL(arr)
            }
            // setValues(initialState)
            setIsLoading(false)
        }

        if (initial) {
            Start()
        }
    })

    const searchName = async (e) => {
        const value = e.target.value;
        setIsLoading(true)
        const search = await InfluencersService.getInfluencers({search: value})
        setValues(search);
        setIsLoading(false)
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
                        <div className={classes.NumberCamp}>1111</div>
                    </div>

                    <div className={classes.SearchContainer}>
                        <Search
                            widthSearch={classes.widthSearch}
                            placeholder={"Search by title..."}
                            onChangeName={(e) => searchName(e)}/>
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
                        <CampaignFilterDropdown/>
                    </div>

                    <div className={classes.LeftContainerFilter}>
                        <span className={`${classes.ChannelsColorText}`}>Effort</span>
                        <CampaignFilterDropdown options={effort}/>
                    </div>

                    <div className={classes.LeftContainerFilter}>
                        <span className={`${classes.ChannelsColorText}`}>Status</span>
                        <CampaignFilterDropdown options={status}/>
                    </div>

                    <div className={classes.LeftContainerFilter}>
                        <span className={`${classes.ChannelsColorText}`}>TL</span>
                        <CampaignFilterDropdown options={TL}/>
                    </div>

                    <div className={classes.LeftContainerFilter}>
                        <span className={`${classes.ChannelsColorText}`}>Budget</span>
                        <div className={classes.BudgetInput}>
                            <input type={'number'} min="0" placeholder={'Min'}/>
                            <span> – </span>
                            <input type={'number'} min="0" placeholder={'Max'}/>
                        </div>
                    </div>

                    <div className={classes.LeftContainerFilter}>
                        <span className={`${classes.ChannelsColorText}`}>Profit</span>
                        <div className={classes.BudgetInput}>
                            <input type={'number'} min="0" placeholder={'Min'}/>
                            <span> – </span>
                            <input type={'number'} min="0" placeholder={'Max'}/>
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
            {/*    <div>*/}
            {/*        {isLoading ?*/}
            {/*            <div style={{textAlign: "center", fontSize: "18px", fontWeight: "700", marginTop: "30px"}}>*/}
            {/*                <img style={{margin: "20px auto", width: "50px"}} alt="Loading" src={loading}/>*/}
            {/*                <p>Please wait...</p>*/}
            {/*            </div>*/}
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
