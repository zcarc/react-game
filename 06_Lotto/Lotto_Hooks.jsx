import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
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

    const [winBalls, setWinBalls] = useState([]);

    // useMemo(), useCallback(), useEffect()는 두번째 인자가 존재한다.
    // 최초 한번은 호출되고 두번째 인자가 바뀌지 않으면 실행되지 않는다.
    // 여기서 쓰인 이유는 함수의 실행결과를 저장하기 위해서 쓰였다.
    const lottoNumber = useMemo(() => getWinNumbers(), []);

    // Hooks는 클래스와 다르게 컴포넌트 자체가 전부 다시 실행되기 때문에
    // getWinNumbers() 함수가 반복해서 실행된다.
    const [winNumbers, setWinNumbers] = useState(lottoNumber);

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


    const onClickRedo = useCallback(() => {
        console.log('onClickRedo()...');

        // onClickRedo가 다른곳에서 호출되었다고 할지라도
        // useCallback() 자체가 실행되지 않으면
        // 최초에 실행했던 값들을 그대로 기억한채로 저장되어 있어서
        // 변경된 값들을 불러오려면 useCallback() 자체를 다시 실행시켜야한다.
        // 실행시키는 방법은 두번째 인자에 해당 값이 변경되었을 때
        // useCallback()이 실행되도록 해야한다.
        console.log('winNumbers: ', winNumbers);

        setWinNumbers(getWinNumbers()); // 당첨 숫자들
        setWinBalls([]);
        setBonus(null); // 보너스 공
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);


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