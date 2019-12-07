import React, {Component} from 'react';

class ResponseCheck extends Component {

    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    // 렌더링이 필요 없다면 state 바깥에 선언이 가능하다.
    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const {state, message, result} = this.state;

        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });


            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭',
                });

                // Math.floor(Math.random() * 1000): 0~1000까지 랜덤
                // +2000 기본이 2000에서 랜덤값 (0~1000)을 더해서 2초 ~ 3초
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤:


            this.startTime = new Date();

        } else if (state === 'ready') { // 빨간색일 때 클릭

            // 처음에 하늘색인 "waiting" 상태에서 클릭을 하면
            // 빨간색 배경인 "ready" 상태가 되는데
            // 이 상태에서는 기다리면 초록색인 "now"가 된다.
            // 그런데 "ready" 상태(빨간색 배경)일 때 클릭을 한다면
            // 초록색 배경인 "now"로 변하게 만드는 setTimeout()이 실행되기전에
            // 클릭을 한 것이므로 setTimeout()이 실행 안되게 클리어 해줘야한다.
            clearTimeout(this.timeout);

            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.',
            });

        } else if (state === 'now') { // 클릭해야할 때 클릭
            this.endTime = new Date();

            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }


    };

    renderAverage = () => {

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

                result.length !== 0 &&  <>
                <div>평균시간:{result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={this.onReset}>리셋</button>
            </>
        )
    };

    onReset = () => {
        this.setState({
            result: []
        });
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