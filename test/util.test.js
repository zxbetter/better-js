import {clone, getClass, extend} from '../src/index'

describe('util test', () => {
  it('clone()', () => {
    expect(clone()).toEqual(undefined)
    expect(clone(1)).toEqual(1)
    expect(clone(new Date())).toEqual(new Date())
    expect(clone(['1', '2'])).toEqual(['1', '2'])
    expect(clone({a: 'A', b: 'B'})).toEqual({a: 'A', b: 'B'})

    let parent = {name: 'Babe'}
    let child = Object.create(parent)
    expect(clone(child)).toEqual({})
  })

  it('getClass()', () => {
    expect(getClass(null)).toEqual('Null')
    expect(getClass(undefined)).toEqual('Undefined')
    expect(getClass(1)).toEqual('Number')
    expect(getClass('1')).toEqual('String')
    expect(getClass(false)).toEqual('Boolean')
    expect(getClass({})).toEqual('Object')
    expect(getClass(/./)).toEqual('RegExp')
    expect(getClass(new Date())).toEqual('Date')
    expect(getClass(function() {})).toEqual('Function')
    expect(getClass(arguments)).toEqual('Arguments')
  })

  it('extend()', () => {
    let obj = {name: 'abc', date: new Date('2017/12/09')}
    let child = Object.create(obj)
    // 不传参数时
    expect(extend()).toEqual({})
    // 一个参数时
    expect(extend(false)).toEqual({})
    expect(extend({}, {a: 1})).toEqual({a: 1})
    // 对属性值是 undefined 的处理
    expect(extend({}, {a: undefined})).toEqual({})
    // 深拷贝对对象和数组的处理
    expect(extend(true, {}, {a: {b: 1}, array: [1, 2]})).toEqual({a: {b: 1}, array: [1, 2]})
    expect(extend(true, {a: {b: 2}, array: [3, 4]}, {a: {b: 1}, array: [1, 2]})).toEqual({a: {b: 1}, array: [1, 2]})
    // 对非对象和 null 的处理
    expect(extend(true, 'a', null)).toEqual({})
    // 防止死循环
    expect(extend(obj, {names: obj})).toEqual(obj)
    // 非自有属性
    expect(extend({}, child)).toEqual({})
    // 深拷贝时间
    expect(extend(true, {}, obj)).toEqual({name: 'abc', date: new Date('2017/12/09')})
  })
})
