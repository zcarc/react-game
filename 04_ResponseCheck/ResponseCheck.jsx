import React, {Component} from 'react';

class ResponseCheck extends Component {

    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    onClickScreen = () => {

    };

    renderAverage =() => {

        const {result} = this.state;

        // 빈 배열일 때는 합계 구하는 reduce를 사용하지 못해서 해결 방법이 필요하다.
        // 두가지 방법이 있다.
        // 1. 조건부 연산자 (삼항 연산자)를 사용해서 해결해야한다.
        // {this.state.result.length === 0
        //     ? null
        //     : <div>
        //
        //         평균시간:{this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms
        //     </div>
        // }


        // 2. 보호 연산자를 사용하는 방법도 있다.
        // && 연산자는 그 전값이 true가 나오면 다음 변수로 넘어간다는 의미이다.
        // 반대로 || 연산자는 false가 나온다면 다음 변수로 넘어간다.
        return (
            result.length !== 0 &&
            <div>평균시간:{result.reduce((a, c) => a + c) / result.length}ms</div>
        )
    };

    render() {
        return (
            <>
                <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                {this.renderAverage()}
            </>
        )
    }
}

export default ResponseCheck;