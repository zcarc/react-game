import React, {useState, useRef, useEffect} from 'react';
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

const Lotto = () => {

    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);


    useEffect(() => {
        console.log('ueseEffect()...');
        console.log('timeouts.current: ', timeouts.current);

        for (let i = 0; i < winNumbers.length - 1; i++) {
            console.log('for i: ', i);

            timeouts.current[i] = setTimeout(() => {
                console.log('setTimeout i: ', i);

                setWinBalls((prevWinBalls) => {
                    return [...prevWinBalls, winNumbers[i]];
                });
            }, (i + 1) * 1000);
        }

        timeouts.current[6] = setTimeout(() => {
            console.log('timeouts.current[6] setTimeout...');

            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {
            timeouts.current.forEach( (v) => {
               clearTimeout(v);
            });
        };

    }, [timeouts.current]); // 빈 배열이면 componentDidMount()와 동일
    // 배열의 요소(값)가 있다면 componentDidMount() 와 componentDidUpdate() 둘 다 수행
    // 두번째 인자 배열에 값이 있던 없던 참이던 거짓이던 무조건 componentDidMount()의 역할은 수행한다.
    // 그리고 두번째부터는 해당 조건일 때만 실행된다. 그게 바로 componentDidUpdate()의 역할이다.
    // timeouts.current를 넣은 이유는 저 부분이 바뀌는 순간일 때만 update를 한다는 의미이다.
    // 바뀌는 순간은 onClickRedo()를 호출할 때이다.


    const onClickRedo = () => {
        console.log('onClickRedo()...');

        setWinNumbers(getWinNumbers()); // 당첨 숫자들
        setWinBalls([]);
        setBonus(null); // 보너스 공
        setRedo(false);
        timeouts.current = [];
    };


    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
};

export default Lotto;