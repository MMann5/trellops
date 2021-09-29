import React, { Component } from 'react';
export class ColorPick extends Component{
    render(){
        return(
            <div className="color-pick">
                <div className="colors">
                    <div className="color-container green" onClick={()=> this.props.setColor('#7BC86C')}></div>
                    <div className="color-container yellow" onClick={()=> this.props.setColor('#F5DD29')}></div>
                    <div className="color-container orange" onClick={()=> this.props.setColor('#FFAF3F')}></div>
                    <div className="color-container red" onClick={()=> this.props.setColor('#EF7564')}></div>
                    <div className="color-container purple" onClick={()=> this.props.setColor('#CD8DE5')}></div>
                    <div className="color-container blue" onClick={()=> this.props.setColor('#5BA4CF')}></div>
                    <div className="color-container light-blue" onClick={()=> this.props.setColor('#29CCE5')}></div>
                    <div className="color-container light-green" onClick={()=> this.props.setColor('#6DECA9')}></div>
                    <div className="color-container pink" onClick={()=> this.props.setColor('#FF8ED4')}></div>
                    <div className="color-container dark-blue" onClick={()=> this.props.setColor('#172B4D')}></div>
                </div>
            </div>
        )
    }
}