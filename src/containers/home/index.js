import React, { Component } from 'react'
import Card from '../../components/Card'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import NYTimesService from '../../service/nytimes'

import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


const SearchWrap = styled.div`
    width: 70%;
    margin: 0 auto 20px auto;
    border: 1px solid gray;
    border-radius: 30px;
    display: flex;
    padding: 2px 20px;

    @media screen and (min-width: 768px){
        width: 40%;
    }

    .inputWrap{
        flex: 1;
    }



`

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            pages: 0,
            items: [],
            results: [],
            status: '',
            term: '',
            period: 1
        }
    }

    handlePeriodChange = (e) => {
        this.setState({
            period : e.target.value
        })     

        setTimeout(() => {
            this.getArticle(this.state.period);
        },0)
        
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState({
            term: value,
        })
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onSearch();
        }
      }

    onSearch = () => {
        console.log('-------onSearch------');
        const term = this.state.term;
        const array = this.state.items;
        const search_result = [];
        let results_updated = [];

        if(term != ''){
            console.log('term != ""')
            array.map(res => {
                console.log(res)
                if(res.title.search(term) != -1){
                    search_result.push(res)
                }
            })
            if(search_result.length != 0){
                console.log('search result length != 0')
                results_updated = search_result;
                
            }else{
                results_updated = []
                
            }
        }else{
            results_updated =  array;
        }

        this.setState({
            results: results_updated
        })
        
        

    }

    componentWillMount() {
        this.getArticle(this.state.period);
    }

    getArticle = (period) => {
        console.log(period);
        NYTimesService.getPopularViews(period).then(res => {
            console.log(res.status)
            if (res.status === 200) {
                this.setState({
                    count: res.data.num_results,
                    items: res.data.results,
                    status: 'success'
                })
                
                this.onSearch()
            }
        }, (err) => {

            this.setState({
                status: err.statusText
            })
        }
        )
    }

    render() {
        return (
            <React.Fragment>
                <h1>New York Times - Most Popular</h1>
                <Grid>
                    <SearchWrap>
                        <InputBase
                            className='inputWrap'
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            onChange={this.onChange}
                            onKeyDown={this._handleKeyDown}
                        />
                        <IconButton aria-label="search" onClick={this.onSearch}>
                            <SearchIcon />
                        </IconButton>
                    </SearchWrap>
                </Grid>
                <Grid className='text-right period'>
                    <Select
                        value={this.state.period}
                        onChange={this.handlePeriodChange}
                        inputProps={{
                            name: 'period',
                            id: 'period',
                        }}
                        >
                        <MenuItem value={1}>1 day</MenuItem>
                        <MenuItem value={7}>7 days</MenuItem>
                        <MenuItem value={30}>1 month</MenuItem>
                    </Select>
                </Grid>
                {this.state.status === 'success' ?
                    
                    this.state.results.length != 0 ?
                        <Grid container spacing={2}>
                        {this.state.results.map((res, index) =>

                            <Grid item xs={12} sm={4} key={index} className='dflex'>
                                <Card 
                                    title={res.title || res.headline.main} 
                                    abstract={res.abstract} 
                                    id={res.uri.split('/')[3]}
                                    imgurl = {res.media[0]['media-metadata'][2].url}
                                />
                            </Grid>

                        )}

                        </Grid > : <Grid className='notfound'>-- Notfound --</Grid>
                    
                    : <Grid>{this.state.status}</Grid>}
            </React.Fragment>
        )
    }
}
