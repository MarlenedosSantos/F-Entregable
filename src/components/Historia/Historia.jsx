import React, {Component} from 'react';
import data from '../data.json'

export class Historia extends Component{
    render(){
        return(
            <>
            <h1 className="historia">{data[this.props.contador].historia}</h1>
            </>
        )
    }
}

export default Historia
