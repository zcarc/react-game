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
            // setState('ready');
            // setMessage('초록색이 되면 클릭하세요.');

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
        </>
    )

};

export default ResponseCheck_Hooks;