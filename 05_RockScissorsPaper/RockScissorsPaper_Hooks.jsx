import React, {useState, useRef, useEffect} from 'react';

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

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

const RockScissorsPaper_Hooks = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock);
    const [score, setScore] = useState(0);
    const interval = useRef();

    const changeHand = () => {
        console.log('interval');
        if (imgCoord === rspCoords.rock) {
            console.log('if (imgCoord === rspCoords.rock)');
            setImgCoord(rspCoords.scissors);

        } else if (imgCoord === rspCoords.scissors) {
            console.log('else if (imgCoord === rspCoords.scissors)');
            setImgCoord(rspCoords.paper);

        } else if (imgCoord === rspCoords.paper) {
            console.log('else if (imgCoord === rspCoords.paper)');
            setImgCoord(rspCoords.rock);
        } else {
            console.log('else');
            console.log('imgCoord: ', imgCoord);
            console.log('rspCoords: ', rspCoords);
        }

    };

    // 고차함수
    // 호출부에서 () => onClickBtn('rock') 이런식으로 함수로 호출했을 경우에 사용한다.
    // onClickBtn = (choice) => {

    // onClickBtn = () => (choice) => { //이렇게 사용해도 에러가 발생하지 않는다.
    const onClickBtn = (choice) => () => {


        clearInterval(interval.current);

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        console.log('choice: ', choice);
        console.log('imgCoord: ', imgCoord);
        console.log('myScore: ', myScore);
        console.log('cpuScore: ', cpuScore);
        console.log('diff: ', diff);


        if (diff === 0) {
            setResult('비겼습니다!');

        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);

        } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
        }

        setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);
    };


    // 두번째 인자를 입력하지 않으면 어떤 값이 변경되더라도 실행된다.
    // 만약 두번째에 인자를 [] 빈배열로 넣었다면 useEffect()는 최초 한번만 실행된다.
    // [] 배열 안에 들어가는 값이 변경되면 다시 useEffect()를 실행한다.
    // 최초에 useEffect()는 두번째 인자와 관계없이 실행되고
    // 두번째 호출 시 부터 두번째 인자의 변경에 따라 실행 여부가 갈린다.
    useEffect(() => { // componentDidMount(), componentDidUpdate() 역할 (1대1 대응은 아님)

        console.log('useEffect 실행');

        // 매번 clearInterval()를 해주기 때문에 setTimeout()과 동일하다.
       interval.current = setInterval(changeHand, 100);

        return () => { // componentWillUnmount() 역할
            console.log('useEffect 종료');
            clearInterval(interval.current);
        }

    }, [imgCoord]);



    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                {/*<button id="rock" className="btn" onClick={() => this.onClickBtn('rock')}>바위</button>*/}
                <div>Hooks</div>
                <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('scissors')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );


};

export default RockScissorsPaper_Hooks;