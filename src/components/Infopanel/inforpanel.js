import React, { Component } from 'react';
import TitleBar from './components/Titlebar';
import PropTypes from 'prop-types';

class Inforpanel extends Component {
  constructor(props){
    super(props);
    this.state = {
      expand : false
    }
  }

  static propTypes = {
    title: PropTypes.string,
    info: PropTypes.Object
  };

  static defaultProps = {
    title: 'Sample Title',
    info: {
      "source":"source" , 
      "author":"author", 
      "title" : "title", 
      "description": "description"
    }
  };
  handleChange  = () => {
    console.log(this.state.expand);
    this.setState({ expand : !this.state.expand });
    
  };
  render() {
    const {title,info} = this.props;
    return (
      <div style={{display:'inline-block', width:'50%'}}>
        <TitleBar title={info.title} info = {info} expand = {this.state.expand} handleClickExpand = {this.handleChange}/>
      </div>
    );
  }
}

export default Inforpanel;