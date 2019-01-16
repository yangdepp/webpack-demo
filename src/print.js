export default function printMe() {
  console.log('I get called from print.js!')
  let a = [1,2,3]
  let b = a.find(item =>{
    return item > 1
  })
  console.log(`b的值是${b}`)
}