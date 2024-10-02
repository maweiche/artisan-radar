// HOOK TO ADD EMAIL TO GOOLGE SHEET WAITLIST

import { Enum } from "@solana/web3.js";

export async function addToWaitlist(
    name: string, 
    email: string,
    interest: string,
    vipAccess: boolean,
    referOthers: boolean,
    updatePreference: string,
) {
    const URL = 'https://script.google.com/macros/s/AKfycbzD2-44rIlx7VE-pDezLKRfMWmqIXf_wNdf7HZxsCYPcBWWU34Z6BVIRd26zxACq_-_7Q/exec'

    console.log('url is', URL);
    const res = await fetch(`${URL}?name=${name}&email=${email}&interest=${interest}&vipAccess=${vipAccess}&referOthers=${referOthers}&updatePreference=${updatePreference}`);
    const data = await res.json();

    console.log('data is', data);

    return data;
}