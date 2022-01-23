const expresions = {
    userName: /^[a-zA-Z0-9_-]{4,16}$/,
    name: /^[a-zA-ZÀ-ÿ\s.]{1,40}$/,
    productName: /^[a-zA-ZÀ-ÿ0-9\s.]{1,60}$/,
    observation: /^[a-zA-ZÀ-ÿ0-9\s.,]{1,100}$/,
    code: /^[a-zA-Z0-9-.]{1,8}$/, 
    password: /^.{4,12}$/,
    docId: /^([VJE]{1})-(\d{6,12})$/,
    numberPhone: /^(\d{4})-(\d{7})$/,
    date: /^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\1\d{4}$/ ,
    unitSymbol: /^[a-zA-ZÀ-ÿ0-9.-_+]{1,4}$/,
    numberFormat:/^[0-9.,]{8}$/
}

module.exports = { expresions }