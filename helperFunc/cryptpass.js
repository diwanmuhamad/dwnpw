var bcrypt = require('bcryptjs');

export async function hashpass(pass) {
    return await bcrypt.hash(pass, 10).then(function(has) {
        return has
    });
}

export async function isSamePass(pass, hashpass) {
    return await bcrypt.compare(pass, hashpass).then((res)=> {
        return res;
    })
} 

