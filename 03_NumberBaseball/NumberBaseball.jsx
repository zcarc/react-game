import React, {Component} from 'react';
import Try from './Try';

function getNumbers(){ // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for(let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }

    return array;
}

class NumberBaseball extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         result: '',
    //         value: '',
    //         answer: getNumbers(),
    //         tries: [],
    //     };
    //
    //     // bind(this): NumberBaseball
    //     // 예전 리액트에서 onChnageInput()에 함수를 사용하지 않고 사용했었을 때는 아래 코드가 필요했다.
    //     this.onChangeInput = this.onChangeInput.bind(this);
    // }
    //
    // onChangeInput(e) {
    //     console.log(this);
    //     this.setState({
    //         value: e.target.value
    //     });
    // };

    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [],
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        // 정답일 경우
        if(this.state.value === this.state.answer.join('')) {
            console.log('정답인 경우');
            console.log('before setState tries: ', this.state.tries);

            this.setState({
                result: '홈런',
                tries: [...this.state.tries, {try: this.state.value, result: '홈런!'}]
            });

            console.log('after setState tries: ', this.state.tries);

            alert('게임을 다시 시작합니다.');

            // 기존 답을 버리고 새로운 답을 생성
            this.setState({
                value: '',
                answer: getNumbers() ,
                tries: [],
            });

            // 오답일 경우
        } else {

            const answerArray = this.state.value.split('').map( (v) => parseInt(v) );
            console.log('오답 answerArray: ', answerArray);

            let strike = 0;
            let ball = 0;

            // 10번넘게 틀렸을 경우
            if(this.state.tries.length >= 9){
                console.log('10번 이상으로 틀렸을 경우');

                // 10번넘게 틀렸으면 답을 공개
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}였습니다.`
                });

                alert('게임을 다시 시작합니다.');

                // 기존 답을 버리고 새로운 답을 생성
                this.setState({
                    value: '',
                    answer: getNumbers() ,
                    tries: [],
                });

                // 10번 미만으로 틀렸을 경우
            } else {
                console.log('10번 미만으로 틀렸을 경우');

                // 입력한 값과 정답의 배열들을 같은 위치에서 비교
                for(let i = 0; i < 4; i += 1) {

                    // 서로 같다면 strike를 증가
                    if(answerArray[i] === this.state.answer[i]) {
                        strike += 1;

                        // 위치가 다르기는 한데 값은 존재한다면 ball 증가
                        // 배열.includes를 하게되면 해당 배열에 있는 모든 값들에 대해서 인자로 전달된 값이 있는지 확인
                        // 위치와 상관없이 값만 들어있으면 된다.
                    } else if(this.state.answer.includes(answerArray[i])) {
                        ball += 1;
                }
                }

                console.log('before setState tries: ', this.state.tries);

                this.setState({
                    tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
                    value: ''
                });

                console.log('after setState tries: ', this.state.tries);
            }




        }
    };

    onChangeInput = (e) => {
        console.log('this.state.answer: ',this.state.answer);
        this.setState({
           value: e.target.value
        });
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
                    {this.state.tries.map( (v, i) => {
                        return(
                            //리액트에서 아래와 같은 value와 index를 props라고 부른다.
                            <Try key={`${i + 1}차 시도:`} tryInfo={v} />
                        );
                    })}
                </ul>

            </>
        );
    }
}

export default NumberBaseball; // import NumberBaseball