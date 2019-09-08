import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import NYTimesService from '../../service/nytimes'

export default class index extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            result: []
        }
    }

    componentDidMount(){
        const id  = this.props.match.params.id
        NYTimesService.onSearchbyId(id).then((res) =>{
            console.log(res.data.response.docs)
            this.setState({
                result: res.data.response.docs
            })
        },(err) => {
            console.log(2)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Grid className='text-left backbt'>
                    <Link to={'/'}><HomeIcon/> <span>Back to homepage</span></Link>
                </Grid>
                {this.state.result.map((res,index) => 
                    <Grid key={index}>
                        <h1 key={index}>
                        {res.headline.main}
                        </h1>
                        <p>
                            {res.abstract}
                        </p>
                    </Grid>
                    
                )}
            </React.Fragment>
        )
    }
}
