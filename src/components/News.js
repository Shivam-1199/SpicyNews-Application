import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${this.capitalizeFirstLetter(props.category)} - SpicyNews`

  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95759a713168422a8e58eb6a8d522a86&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])
  
          
  // async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95759a713168422a8e58eb6a8d522a86&page=${this.state.page}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    // this.updateNews();
  // }

  // const handlePrevClick = async ()=>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95759a713168422a8e58eb6a8d522a86&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    // this.setState({page: this.state.page - 1});
    // setPage(page - 1)
    // updateNews()
  // }

  // const handleNextClick = async ()=>{
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95759a713168422a8e58eb6a8d522a86&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //   this.setState({loading: true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    // this.setState({page: this.state.page + 1});
    // setPage(page + 1)
    // updateNews()
  // }

  const fetchMoreData = async()=>{
    // this.setState({page: ++this.state.page})
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95759a713168422a8e58eb6a8d522a86&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>SpicyNews - Top Headlines of {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
        >
        <div className='comtainer'>

        <div className='row'>
        {articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItem  title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>

        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
        </div> */}
      </div>
    )
}

News.deafaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News