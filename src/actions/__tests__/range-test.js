import getRange from '../range'

describe('actions/getRange', () => {
  it('returns range between 2 and totalPage if totalPage' +
     'is larger than preset range', () => {
    expect(getRange(1, 1, 3)).toEqual([2])
  })

  it('returns range before and after current number according to set limit', () => {
    expect(getRange(4, 10, 3)).toEqual([3, 4, 5])
  })

  it('sets initial to 2 if current number is 1', () => {
    expect(getRange(1, 10, 3)).toEqual([2])
  })

  it('sets last number to totalPage if current number is close to total', () => {
    expect(getRange(8, 10, 3)).toEqual([7, 8, 9])
  })

  it('sets last number to totalPage if current number equal total', () => {
    expect(getRange(10, 10, 3)).toEqual([9])
  })
})
