import { getByTitle } from '@testing-library/dom'
import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,desc,imgUrl,newsUrl}=this.props;
        return (
            <div>
               <div class="card" style ={{width: '18rem'}}>
                    <img src={imgUrl} class="card-img-top" alt="..." style={{width:'285px',height:'150px'}}/>
                    <div class="card-body">
                        <h5 class="card-title">{title}...</h5>
                        <p class="card-text">{desc}...</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                    </div>
</div>
            </div>
        )
    }
}

export default NewsItem
