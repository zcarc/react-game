import React, {useState, useRef} from 'react';

const ResponseCheck_Hooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    // ref는 DOM에 직접 접근할 때만 썼었는데
    // Hooks에서는 this의 속성들을 ref로 표현한다.
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {

        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭!');
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤:

            startTime.current = new Date();

        } else if (state === 'ready') { // 빨간색일 때 클릭

            clearTimeout(timeout.current);

            setState('waiting');
            setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');

        } else if (state === 'now') { // 클릭해야할 때 클릭
            endTime.current = new Date();

            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);

            console.log('result: ', result);
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return (
            result.length === 0 ? null : <>
                <div>평균시간:{result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
            </>
        )
    };

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>

            {renderAverage()}

            {/*return 내부에 for과 if를 사용하려면 자바스크립트 문법을 사용해야하고*/}
            {/*즉시 실행 함수로 실행해야한다. 하지만 이런 코드는 좋지 않기 때문에 잘 쓰이지 않는다.*/}
            {/*{( () => {*/}
            {/*    if(result.length === 0){*/}
            {/*        return null;*/}
            {/*    } else {*/}
            {/*        return (*/}
            {/*            <>*/}
            {/*                <div>평균시간:{result.reduce((a, c) => a + c) / result.length}ms</div>*/}
            {/*                <button onClick={onReset}>리셋</button>*/}
            {/*            </>*/}
            {/*        );*/}
            {/*    }*/}
            {/*}) ()}*/}

        </>
    )

    // return [
    //     <div key="사과">사과</div>,
    //     <div key="배">배</div>,
    //     <div key="감">감</div>,
    //     <div key="귤">귤</div>,
    //     <div key="포도">포도</div>,
    // ]

};

export default ResponseCheck_Hooks;