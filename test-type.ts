// 定义函数的调用签名
interface IFnCall<IRoot> {
  <TWhy>(fn: (num: IRoot) => TWhy, age: number): TWhy
}
// 1. 解释第一个 TWhy 这里第一个 TWhy相当于 调用函数的时候传递的返回值
// function abc: <string>(){}
// 2. 解释第二个 TWhy。为定义的这个函数的时候传递进行的参数返回值类型
// function abc: <string>(fn:<string> ){}
// 3. 解释第三个
// 这个是这个函数的返回值类型，虽然没有传 但是通过类型推断获得到了这个数据类型

// 定义函数对象
// foo这个函数的类型为 number，里面传递两个参数、第一个为函数、第二个为number
// 其返回值类型为类型推动出来
const foo: IFnCall<number> = function (fn, age) {
  return fn(111)
}

// 调用函数
foo<string>(() => {
  return "aaa"
}, 18)

// 不传入明确的调用时的泛型, 类型推荐
const res = foo((aaa) => {
  return "aaa"
}, 18)
