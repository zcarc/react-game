import React, {Component} from 'react';

class RockScissorsPaper extends Component {

    // render()가 가장 처음 성공적으로 실행-종료되었다면
    // componentDidMount()가 한번만 실행된다.
    // setState()로 인한 re-Rendering에는 실행되지 않는다.
    // 주로 componentWillUnmount()와 같이 쓰인다.
    componentDidMount() {

    }

    // 부모 Component가 현재의 Component를 제거했을 때 호출된다.
    // 주로 componentDidMount()와 같이 쓰인다.
    componentWillUnmount() {
    }

    // render()가 setState()로 인해서 re-rendering 되어도 실행하는 메서드이다.
    componentDidUpdate(prevProps, prevState, snapshot) {
    }


    render() {
        // Coord: 좌표 (Coordinate)
        const {result, score, imgCoord} = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RockScissorsPaper;