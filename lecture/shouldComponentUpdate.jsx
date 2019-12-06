import React, {PureComponent} from 'react';
import ShouldComponentUpdate_child from './shouldComponentUpdate_child';

class Test extends PureComponent {
    state = {
        counter: 0,
        array: []
    };


    // PureComponent 사용 시 생략
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //
    //     // 지금 카운터와 미래의 카운터의 값이 다르다면 true 반환
    //     if(this.state.counter !== nextState.counter){
    //         return true;
    //     } else {
    //         return false;
    //     }
    //
    //     // return this.state.counter !== nextState.counter;
    // }

    onClickInput = () => {
        // const arr = this.state.array;
        // arr.push(4);
        this.setState({
           // array: arr

           // 아래는 복사를 하기 때문에 변경이 된다.
           array: [...this.state.array, 4]
        });

        console.log(this.state.array);
    };


    render() {
        return(
            <>
                <button onClick={this.onClickInput}>클릭!</button>
                {/*<div>{this.state.array}</div>*/}
                <ShouldComponentUpdate_child array={this.state.array}/>
            </>
        )
    }

}

export default Test;