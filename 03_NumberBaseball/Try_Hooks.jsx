import React, {memo, useState} from 'react';

const Try = memo(({ tryInfo }) => {

    // 자식이 받은 props는 자식이 바꾸면 안되고 부모가 바꿔야한다.
    // 어쩔 수 없는 경우는 아래와 같이 쓴다.
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
      setResult('1');
    };

    return(
        // key에 i를 넣으면 성능에 문제가 있어서 안쓰는게 좋다.
        // key를 기준으로 엘리먼트를 추가,수정,삭제를 하기 때문에 배열에 순서가 바뀌면 문제가 생긴다.
        // 요소가 추가만 되고 삭제가 되지 않는 배열인 경우 i를 써도 된다.
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
            {/*<div onClick={onClick}>{result}</div>*/}

        </li>
    );
});

export default Try;