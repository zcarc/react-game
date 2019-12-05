import React, { Component } from 'react';

class Try extends Component {
    render() {
        return(
            // key에 i를 넣으면 성능에 문제가 있어서 안쓰는게 좋다.
            // key를 기준으로 엘리먼트를 추가,수정,삭제를 하기 때문에 배열에 순서가 바뀌면 문제가 생긴다.
            // 요소가 추가만 되고 삭제가 되지 않는 배열인 경우 i를 써도 된다.
            <li>
                <b>{this.props.value.fruit}:{this.props.value.taste}</b> - {this.props.index}
                <div>컨텐츠1</div>
                <div>컨텐츠2</div>
                <div>컨텐츠3</div>
                <div>컨텐츠4</div>
            </li>
        )
    }
}

export default Try;