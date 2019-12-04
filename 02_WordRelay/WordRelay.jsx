const React = require('react');

class WordRelay extends React.Component {

    state = {
        word: '초밥',
        value: '',
        result: ''
    };

    onChangeInput = (e) => {

        console.log('onChangeInput');
        console.log('e.currentTarget: ', e.currentTarget);
        console.log('e.target: ', e.target);

        this.setState({
            value: e.target.value
        });
    };

    onSubmitInput = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length - 1] === this.state.value[0]) {
            this.setState({
                word: this.state.value,
                value: '',
                result: '정답입니다.',
            });
            this.input.focus();
        } else {
            this.setState({
                value: '',
                result: '오답입니다.',
            });
            this.input.focus();
        }
    };

    onInputRef = (e) => {
        this.input = e;
    };

    input;

    render() {
        return (
          <>
              <div>{this.state.word}</div>
              <form onSubmit={this.onSubmitInput}>
                  <input ref={this.onInputRef} type="text" value={this.state.value} onChange={this.onChangeInput}/>
                  <button>클릭1</button>
                  <div>자동으로12</div>
              </form>
              <div>{this.state.result}</div>
          </>
        );
    }

}

module.exports = WordRelay;