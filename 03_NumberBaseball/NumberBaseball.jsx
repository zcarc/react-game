import React, {Component} from 'react';
import Try from './Try';

function getNumbers(){ // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수

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
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm = () => {

    };

    onChangeInput = (e) => {
        this.setState({
           value: e.target.value
        });
    };

    fruits = [
        {fruit:'apple', taste: 'good'},
        {fruit:'banana', taste: 'good'},
        {fruit:'grape', taste: 'sour'},
        {fruit:'pear', taste: 'sweet'},
    ];

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.fruits.map( (v, i) => {
                        return(
                            //리액트에서 아래와 같은 value와 index를 props라고 부른다.
                            <Try key={v.fruit + v.taste} value={v} index={i} />
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseball; // import NumberBaseball