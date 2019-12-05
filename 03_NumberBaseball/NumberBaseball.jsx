import React, {Component} from 'react';

function getNumbers(){ // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = () => {

    };

    onChangeInput = () => {

    };

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {[
                        {fruit:'apple', taste: 'good'},
                        {fruit:'banana', taste: 'good'},
                        {fruit:'grape', taste: 'sour'},
                        {fruit:'pear', taste: 'sweet'},
                    ].map( (v, i) => {
                        return(
                            // key에 i를 넣으면 성능에 문제가 있어서 안쓰는게 좋다.
                            // key를 기준으로 엘리먼트를 추가,수정,삭제를 하기 때문에 배열에 순서가 바뀌면 문제가 생긴다.
                            // 요소가 추가만 되고 삭제가 되지 않는 배열인 경우 i를 써도 된다.
                          <li key={v.fruit + v.taste}>{v.fruit}:{v.taste} - {i}</li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball; // import NumberBaseball