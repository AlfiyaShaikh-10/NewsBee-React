import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,desc,imgUrl,newsUrl,date,source}=this.props;
        return (
            <div>
               <div className = "card" style ={{width: '18rem'}}>
               <span className="position-absolute top-0 translate-middle badge rounded-pill bg-secondary" style={{left:'90%',zIndex:'1'}}>{source}</span>
                    <img src={!imgUrl?'https://images.hindustantimes.com/tech/img/2021/12/07/1600x900/HP_OMEN_16_1638861429374_1638861490100.jpg':imgUrl} className="card-img-top" alt="..." style={{width:'285px',height:'150px'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}...</p>
                        <p className="card-text"><small className="text-danger">{new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
</div>
            </div>
        )
    }
}

export default NewsItem
