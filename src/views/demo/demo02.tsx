import React, { PureComponent } from "react"
/**
 * state:
 * props:
 * 类组件与ts的结合
 */

interface IProps {
  name: string
  age?: number
}

interface IState {
  message: string
  counter: number
}
// 第三个参数作为了解 不经常使用
// 这里是类型约束、里面传递的两个参数。第三个参数定义返回值类型
class Demo02 extends PureComponent<IProps, IState> {
  name = "aaaa"
  state = {
    message: "Hello World",
    counter: 99
  }

  // 这里是第三个返回值，返回值类型必须与这里的一样
  // getSnapshotBeforeUpdate() {
  //   return { address: '庐山' }
  // }
  // 在这里使用第三个参数 snapshot 这个是第三个参数
  // componentDidUpdate(
  //   prevProps: Readonly<IProps>,
  //   prevState: Readonly<IState>,
  //   snapshot?: ISnapshot | undefined
  // ): void {}

  // constructor(props: IProps) {
  //   super(props)

  //   // this.state = {
  //   //   message: 'Hello World',
  //   //   counter: 100
  //   // }
  // }

  render(): React.ReactNode {
    return (
      <div>
        name: {this.props.name}
        age: {this.props.age}
        message: {this.state.message}
        counter: {this.state.counter}
      </div>
    )
  }
}

export default Demo02
