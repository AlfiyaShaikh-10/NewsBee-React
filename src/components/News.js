import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:8,
        category: 'general'
    }
    PropTypes = {
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category:PropTypes.string,

    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
    fetchMoreData = async() => {
        this.setState({page:this.state.page+1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0c674d525c449b3b8348c49d4df2e86&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData); 
        this.setState({articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
           })
            
      };

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
    }


    UpdateNews = async ()=> {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0c674d525c449b3b8348c49d4df2e86&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        
        this.props.setProgress(100);
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false})
    }

    async componentDidMount(){ 
        this.UpdateNews();
    }

     handlePrevClick = async ()=>{
        this.setState({page:this.state.page-1});
        this.UpdateNews();
        
    }
    
    handleNextClick = async ()=>{
        this.setState({page:this.state.page+1});     
        this.UpdateNews();
    }

    render() { 
        return (
            <>
                <h1 className="text-center" style={{margin:'35px,0px'}}>NewsMonkey - {this.capitalizeFirstLetter(this.props.category)}- Headlines</h1>    
                {this.state.loading && <Spinner/> }           
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >       <div className="container my-3">
                <div className="row"> 
                { this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-2" key={element.url}>
                        <NewsItem title={element.title?element.title:""} desc={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name}/>
                    </div> 
                })} 
                </div> 
                </div>
                </InfiniteScroll>
                
            </>
        )
    }
}

export default News