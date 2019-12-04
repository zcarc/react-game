const React = require('react');
const {useState, useRef} = React;

const WordRelay = () => {

    const [word, setWord] = useState('초밥');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    const onSubmitInput = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setWord(value);
            setValue('');
            setResult('정답입니다.');
            inputRef.current.focus();
        } else {
            setValue('');
            setResult('오답입니다.');
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitInput}>
                <label htmlFor="wordInput">정답을 입력하세요. </label>
                <input id="wordInput" className="wordInput" ref={inputRef} type="text" value={value} onChange={onChangeInput}/>
                <button>클릭!</button>
            </form>
            <div>{result}</div>
        </>
    );

};

module.exports = WordRelay;