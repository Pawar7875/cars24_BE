const useme = (error, data) => {
    const result = {}
    if (error) {
        result.status = 'Failure'
        result.error = error
        console.error(error)
    }
    else {
        result.status = 'Success'
        result.data = data
    }
    return result
}
module.exports = {
    useme
}