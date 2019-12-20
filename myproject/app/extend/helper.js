const crypto = require('crypto');

module.exports = {
    hmc(password) {
        const secret = '1706e';
        const hash = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');  
        return hash
    }
}