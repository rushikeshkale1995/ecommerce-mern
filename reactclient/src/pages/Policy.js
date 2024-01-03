import React from 'react'
import Layouts from '../components/Layout/Layouts'
import { BiInfoCircle, BiLock } from 'react-icons/bi';

const Policy = () => {
  return (
    <Layouts title={"Privacy-policy - Ecommerse"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src="/images/policy.jpg" alt="contactus" style={{ width: "90%" }} />
        </div>
        <div className="col-md-4">
          <h1 className='bg-dark p-2 text-white text-center'>PRIVACY POLICY</h1>
          <p className='text-justify mt-3'><BiLock /> : Privacy policies to keep your e-commerce store safe from any legal issue. All about how your e-commerce collects and protects payment details and private info. Benefits: Host Policies, Manual Customization, Constant Updates.
          </p>
          <p className="mt-3">
            <BiInfoCircle />: Quick & Easy Setup - Everything You Need To Start Selling Online Today. Grow Your Business With Our Unified Platform. Start a Free Trial Now.! Fully Hosted. Unlimited 24/7 Support. Social Media Integration. 100+ Professional Themes. Shop Pay at Checkout.
          </p>

        </div>
      </div>
    </Layouts>
  )
}

export default Policy


// function prime(no) {
//   if (no <= 1) {
//     return false;
//   }

//   for (let i = 2; i <= Math.sqrt(no); i++) {
//     if (no % i === 0) {
//       return false; // this is not a prime number
//     }
//   }

//   return true; // this is prime number
// }


// const firstno = 3;
// const secondno = 4;

// if (prime(firstno)) {
//   console.log("Yes");
// } else {
//   console.log("No");
// }

// if (prime(secondno)) {
//   console.log("Yes");
// } else {
//   console.log("No");
// }



// third program
// function largeno(arr) {
//   if (arr.length === 0) {
//     return "";
//   }

//   const compare = (x, y) => {
//     const n1 = x.toString();
//     const n2 = y.toString();
//     return (n2 + n1).localeCompare(n1 + n2);
//   };

//   arr.sort(compare);

//   return arr.join("");
// }

// const input = [54, 546, 548, 60];
// console.log(largeno(input)); // op: 6054854654



// forth program
// function reverseNumber(N) {
//   const rev = N.toString().split('').reverse().join('').replace(/^0+/, '');
//   return parseInt(rev, 10);
// }

// const input = 988;
// console.log(reverseNumber(input));


// fifth program
// function MinMax(arr) {
//   if (arr.length === 0) {
//     return "This is empty array";
//   }

//   let maxarr = arr[0];
//   let minarr = arr[0];

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > maxarr) {
//       maxarr = arr[i];
//     }
//     if (arr[i] < minarr) {
//       minarr = arr[i];
//     }
//   }

//   return `${maxarr} ${minarr}`;
// }

// // Example usage:
// const input = [54, 546, 548, 60];
// console.log(MinMax(input)); // Output: 548 54


// first program
// function revstr(inputString) {
//   return inputString.split('').reverse().join('');
// }

// const input = 'codecode';
// console.log(revstr(input)); 
