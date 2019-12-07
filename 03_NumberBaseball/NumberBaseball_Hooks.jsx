import React, { useState, useRef } from 'react';
import Try from './Try_Hooks';

function getNumbers(){ // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for(let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }

    return array;
}

const NumberBaseball = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = React.useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = React.useState([]);
    const onInputRef = useRef(null);

    const onSubmitForm = (e) => {
        e.preventDefault();

        // 정답일 경우
        if(value === answer.join('')) {
            console.log('정답인 경우');
            console.log('before setState tries: ', tries);

            // 기존에 있는 state 값을 가져오는 경우는 함수로 만들어서 사용해야 문제가 안생긴다.
            // 그리고 setState도 여러번 나오기 때문에 이렇게 해줘야한다.
            setResult('홈런');
            setTries((prevTries) => {
                return [...prevTries, {try: value, result: '홈런!'}];
                }
            );

            console.log('after setState tries: ', tries);

            alert('정답이므로 게임을 다시 시작합니다.');

            // 기존 답을 버리고 새로운 답을 생성
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

            onInputRef.current.focus();

            // 오답일 경우
        } else {

            const answerArray = value.split('').map( (v) => parseInt(v) );
            console.log('오답 answerArray: ', answerArray);

            let strike = 0;
            let ball = 0;

            // 10번넘게 틀렸을 경우
            if(tries.length >= 9){
                console.log('10번 이상으로 틀렸을 경우');

                // 10번넘게 틀렸으면 답을 공개
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다.`);

                alert('게임을 다시 시작합니다.');

                // 기존 답을 버리고 새로운 답을 생성
                setValue('');
                setAnswer(getNumbers());
                setTries([]);

                onInputRef.current.focus();

                // 10번 미만으로 틀렸을 경우
            } else {
                console.log('10번 미만으로 틀렸을 경우');

                // 입력한 값과 정답의 배열들을 같은 위치에서 비교
                for(let i = 0; i < 4; i += 1) {

                    // 서로 같다면 strike를 증가
                    if(answerArray[i] === answer[i]) {
                        strike += 1;

                        // 위치가 다르기는 한데 값은 존재한다면 ball 증가
                        // 배열.includes를 하게되면 해당 배열에 있는 모든 값들에 대해서 인자로 전달된 값이 있는지 확인
                        // 위치와 상관없이 값만 들어있으면 된다.
                    } else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }

                console.log('before setState tries: ', tries);

                setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]);
                setValue('');

                console.log('after setState tries: ', tries);

                onInputRef.current.focus();
            }
        }
    };

    const onChangeInput = (e) => {
        console.log('answer: ',answer);
        setValue(e.target.value);
    };

    return (
        <>
            <h1>Hooks</h1>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input ref={onInputRef} maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <div>시도: {tries.length}</div>

            <ul>

                {tries.map( (v, i) => {
                    return(
                        //리액트에서 아래와 같은 value와 index를 props라고 부른다.
                        <Try key={`${i + 1}차 시도:`} tryInfo={v} />
                    );
                })}


                {/*return 내부에 for을 사용하는 방법*/}
                {/*권장하는 방법은 아니다.*/}
                {/*{( () => {*/}
                {/*  const array = [];*/}
                {/*  for(let i = 0; i < tries.length; i++) {*/}
                {/*      array.push(<Try key={`${i + 1}차 시도:`} tryInfo={tries[i]} />);*/}
                {/*  }*/}
                {/*  return array;*/}
                {/*})()}*/}

            </ul>

        </>
    );
};


export default NumberBaseball; // import NumberBaseball