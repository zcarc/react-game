import React, {Component} from 'react';

class Test extends Component {
    state = {
        counter: 0
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        // 지금 카운터와 미래의 카운터의 값이 다르다면 true 반환
        if(this.state.counter !== nextState.counter){
            return true;
        } else {
            return false;
        }

        // return this.state.counter !== nextState.counter;
    }

    onClickInput = () => {
        this.setState({})
    };


    render() {
        return(
            <button onClick={this.onClickInput}>클릭!</button>
        )
    }

}

export default Test;