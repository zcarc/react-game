import React, { PureComponent } from 'react';

class Try extends PureComponent {

    // constructor()로 생성하는 경우에는 세부적인 코드를 작성할 때 사용한다.
    constructor(props) {
        super(props);

        this.state = {
            result: this.props.tryInfo.result,
            try: this.props.tryInfo.try
        };
    }

    // 부모의 props 를 자식의 state 상태로 만들 수 있다.
    // state = {
    //   result: this.props.tryInfo.result,
    //   try: this.props.tryInfo.try
    // };

    render() {
        const {tryInfo} = this.props;
        return(
            // key에 i를 넣으면 성능에 문제가 있어서 안쓰는게 좋다.
            // key를 기준으로 엘리먼트를 추가,수정,삭제를 하기 때문에 배열에 순서가 바뀌면 문제가 생긴다.
            // 요소가 추가만 되고 삭제가 되지 않는 배열인 경우 i를 써도 된다.
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default Try;