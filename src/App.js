import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Inforpanel from './components/Infopanel/inforpanel'
import { Button } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import GetArticles from './modules/get_articles';
import axios from 'axios';

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      articles: {},
      loading: false,
    }
  }

  componentDidMount() {
    axios.get('https://newsapi.org/v2/everything?q=natural+disaster+victims&apiKey=8281d920a6634e01a0e2a16c75d1fb8f')
    .then((response) => {
        console.log(response);
        this.setState({articles:response.data.articles, loading:true});        
    }).catch((error)=>{
        return error.response;
    })
  }

  render() {
    const articles = this.state.articles
    if (this.state.loading){
      console.log(this.state.articles)
    var text = '{ "articles" : [' +
    '{ "source":"source1" , "author":"author1", "title" : "title1", "description": "description1" },' +
    '{ "source":"source2" , "author":"author2", "title" : "title2", "description": "description2" },' +
    '{ "source":"source3" , "author":"author3", "title" : "title3", "description": "description3" }]}';
    var infoData = JSON.parse(text);
    const renderInfoPanel = (
      <div>
      {   
        Object.keys(articles).map(function(f){ 
          return (
            <Inforpanel title={articles[f].title} info = {articles[f]}/>
          )
        })
      }
    </div>
  );

  return (
    <div className="App">
      <Navbar/>
      <div style={{position:'absolute', width:'100%'}}>
        <iframe
          align="left"
          frameborder={0} style={{width:"50%", height: 'calc(100vh - 64px)',borderLeft:0}}
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAmRGqEXBVcufLBcFGDw1T-Q5f7WxzUMj4&q=Space+Needle,Seattle+WA" allowfullscreen>
        </iframe>
        {renderInfoPanel}
         

      </div>
    </div>
  );}else{
    
      return (
        <div>
          
        </div>
      )
    
  }

  }
}

export default App;
