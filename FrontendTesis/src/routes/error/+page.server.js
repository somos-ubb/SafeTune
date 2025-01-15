export async function load({ url }){
    let code = url.searchParams.get('code') || null;
    let message = url.searchParams.get('message') || null;
    return {code, message};
}


