import React, {Component} from 'react';

const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px',
};

const scores = {
    rock: 0,
    scissors: 1,
    paper: -1,
};

class RockScissorsPaper extends Component {

    state = {
      result: '',
      imgCoord: '0',
      score: 0,
    };

    interval;

    // render()가 가장 처음 성공적으로 실행-종료되었다면
    // componentDidMount()가 한번만 실행된다.
    // setState()로 인한 re-Rendering에는 실행되지 않는다.
    // 주로 componentWillUnmount()와 같이 쓰인다.
    // 비동기 요청을 주로한다.
    componentDidMount() {
        console.log('hello');

        this.interval = setInterval(() => {
            console.log('interval');
            const {imgCoord} = this.state;
            if (imgCoord === rspCoords.rock) {
                console.log('if (imgCoord === rspCoords.rock)');
                this.setState({
                    imgCoord: rspCoords.scissors,
                });

            } else if (imgCoord === rspCoords.scissors) {
                console.log('else if (imgCoord === rspCoords.scissors)');
                this.setState({
                    imgCoord: rspCoords.paper,
                });

            } else if (imgCoord === rspCoords.paper) {
                console.log('else if (imgCoord === rspCoords.paper)');
                this.setState({
                    imgCoord: rspCoords.rock,
                });
            } else {
                console.log('else');
                console.log('imgCoord: ', imgCoord);
                console.log('rspCoords: ', rspCoords);
            }

        }, 1000);

    }

    // render()가 setState()로 인해서 re-rendering 되어도 실행하는 메서드이다.
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    // 부모 Component가 현재의 Component를 제거했을 때 호출된다.
    // 주로 componentDidMount()와 같이 쓰인다.
    // 비동기 정리를 주로한다.
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => {
        console.log('choice: ', choice);
    };


    render() {
        // Coord: 좌표 (Coordinate)
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('scissors')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RockScissorsPaper;