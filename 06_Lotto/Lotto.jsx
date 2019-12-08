import React, {Component} from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false,
    };

    timeouts = [];

    runTimeouts = () => {
        const {winNumbers} = this.state;

        // for 안에 setTimeout()을 사용하면 원래 클로저 문제가 있었지만
        // ES6 문법인 let을 사용하면 클로저 문제가 발생하지 않는다.
        for (let i = 0; i < winNumbers.length - 1; i++) {
            console.log('for i: ', i);

            this.timeouts[i] = setTimeout(() => {
                console.log('setTimeout i: ', i);
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000);
        }

        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    };

    // render()가 성공적으로 종료되었다면
    // 이 메서드는 딱 한번만 호출된다.
    componentDidMount() {
        console.log('componentDidMount()');
        this.runTimeouts();
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        // setState()가 될 때 마다 이 메서드가 실행되어
        // this.runTimetoues()를 계속 호출하므로 조건문이 반드시 필요하다.
        // winBalss.length가 0이라는 것은 초기화 되었다는 의미
        console.log('componentDidUpdate()...');
        if(this.state.winBalls.length === 0) {
            this.runTimeouts();
        }
    }

    // setTimeout()이 동작하는 중에 브라우저를 끈다면 아래 메서드가 실행된다.
    // 브라우저 끄는것은 componentWillUnmount()가 발생 안하는데
    // 브라우저를 종료 시키는 행위를 부모 컴포넌트가 현재 컴포넌트를 삭제했다고 해석해도 된다.
    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        })
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자들
            winBalls: [],
            bonus: null, // 보너스 공
            redo: false,
        });
        this.timeouts = [];
    };

    render() {
        const {winBalls, bonus, redo} = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v}/>)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus}/>}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        );
    }
}

export default Lotto;