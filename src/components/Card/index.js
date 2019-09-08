import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components'
import {Link} from 'react-router-dom' 

const CardWrap = styled(Link)`
    display: flex;
    background-color: ghostwhite;

    .thumb{
        padding-bottom: 75%;
    }

    .content{
        

        >button{
            height: 100%;

            :hover{
                background-color: white;
            }

            >div{
                padding: 0;

                h2,p{
                    padding: 0 15px;
                }
            }
        }
    }
`


const index = (props) => {
    return (
        <CardWrap to={{ pathname: '/detail/'+props.id}}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        alt="img"
                        image={props.imgurl}
                        title="img"
                        className='thumb'
                    />
                    <CardContent className='content'>
                        <h2>
                            {props.title}
                        </h2>
                        <p>
                            {props.abstract}
                        </p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </CardWrap>
        
    )
}

export default index
