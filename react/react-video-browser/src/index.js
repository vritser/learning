import _ from 'lodash'
import React, { Component } from 'react'
import { render } from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search-bar'
import VideoList from './components/video-list'
import VideoDetail from './components/video-detail'
const API_KEY = 'AIzaSyBMNalINaYg3pFyars6nm5odlnTO1ZMn3I';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    searchVideo(term) {
        YTSearch({ key: API_KEY, term: term }, (videos) => {
            this.setState({ videos, selectedVideo: videos[0] });
        })
    }

    render() {
        const searchVideo = _.debounce(term => this.searchVideo(term), 300);
        return (
            <div>
                <SearchBar onSearchTermChange={searchVideo} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo }) } videos={this.state.videos} />
            </div>
        )
    }
}

render(<App />, document.querySelector('.container'));