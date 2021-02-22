import * as React from 'react'
import ReactDOM from 'react-dom';
import Profile from '../Profile'

describe("Profile module",()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Profile></Profile>, div)
    })

})