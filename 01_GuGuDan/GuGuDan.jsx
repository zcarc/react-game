const React = require('react');
const {useState, useRef} = React;

const GuGudan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null); // null은 초기값
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(parseInt(value) === first * second) {
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
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
            <div>{first}곱하기{second}는?</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} type="number" value={value} onChange={onChangeInput} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

module.exports = GuGudan;