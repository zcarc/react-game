import React from 'react';

// const Ball = React.memo((props) => {
const Ball = React.memo(({number}) => {
    console.log('setTimeout()으로 인해서 render()가 호출되어 자식 컴포넌트에 props가 전달되었음');
    console.log('number: ', number);
    //console.log('props: ', props);
    let background;
    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <div className="ball" style={{ background }}>{number}</div>
    )
});

export default Ball;