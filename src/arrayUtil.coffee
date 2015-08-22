module.exports.isArray = Array.isArray || ( value ) -> return {}.toString.call( value ) is '[object Array]'
