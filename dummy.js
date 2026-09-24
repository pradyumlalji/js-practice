// // let testArr = [1,2,3,4]

// // // polyfill for map
// // const polyMap = (itArr,callback)=>{
// //     let resArr=[]
// // for(let i =0;i<itArr.length;i++){
// //     const res = callback(itArr[i],i,itArr)
// //     resArr.push(res)
// // }
// // return resArr;
// // }

// // const nativeMap =polyMap(testArr,multiply)
// // let res = nativeMap

// // console.log(res)

// /*--------------------------------------------------------------------------------------------------------*/
// //polyfill for filter

// // let testArr = [1,2,3,4]
// // const filterFn = testArr.filter((item)=>item!==4)

// // const polyFilter = (itArr,callback)=>{
// //     let resArr =[]
// //     for(let i =0 ; i<itArr.length;i++){
// //         let res = callback(itArr[i])
// //         res&&resArr.push(itArr[i])
// //     }
// //     return resArr
// // }

// // const cbFn=(item)=>item!==4
// // let res =polyFilter(testArr,cbFn)
// // console.log(res)

// /*--------------------------------------------------------------------------------------------------------*/
// //polyfill for reduce

// // let itArr = [1,2,3,4]
// // const cbf = (curr,item)=>curr=curr+item
// // const initialValue =0
// // // let res = itArr.reduce((curr,item)=>curr=curr+item)

// // Array.prototype.polyReduce=function(cbf,initialValue){
// // let itArr = this
// // let isInitialPresent = arguments.length>1
// // let accumulator;
// // let iteratorIndex;

// // if(isInitialPresent){
// //     accumulator=initialValue
// //     iteratorIndex=0
// // }else{
// //     accumulator=itArr[0]
// //     iteratorIndex=1
// // }
// // for(iteratorIndex;iteratorIndex<itArr.length;iteratorIndex++){
// //     accumulator = cbf(accumulator,itArr[iteratorIndex],iteratorIndex)
// // }
// // return accumulator
// // }

// // let res = itArr.reduce((curr,item)=>curr=curr+item)
// // let res =polyReduce(cbf,initialValue)
// // console.log(res)

// /*--------------------------------------------------------------------------------------------------------*/
// //polyfill for forEach

// Array.prototype.myForEach = function(callback) {

//     const arr = this;

//     for (let i = 0; i < arr.length; i++) {

//         callback(arr[i], i, arr);

//     }
// };

// /*--------------------------------------------------------------------------------------------------------*/
// //polyfill for call
// Function.prototype.myCall = function(context, ...args) {

//     context = context || globalThis;
//     context.fn = this;

//     const result = context.fn(...args);
//     delete context.fn;

//     return result;
// };

// /*--------------------------------------------------------------------------------------------------------*/
// //polyfill for apply
// Function.prototype.myApply = function(context, args) {

//     context = context || globalThis;
//     context.fn = this;

//     const result = context.fn(...(args || []));
//     delete context.fn;

//     return result;
// };
// /*--------------------------------------------------------------------------------------------------------*/
// //polyfill for bind
// Function.prototype.myBind = function(context, ...args) {

//     const originalFunction = this;

//     return function(...newArgs) {

//         return originalFunction.apply(
//             context,
//             [...args, ...newArgs]
//         );

//     };
// };
