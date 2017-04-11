'use strict';

module.exports = (res, err) => {
    return res.status(422).send({
        success: false,
        error: {
            code: 'E_UNPROCESSABLE_ENTITY',
            validation: err.validation,
            message: err.message || 'Validation failed!'
        }
    });
};
