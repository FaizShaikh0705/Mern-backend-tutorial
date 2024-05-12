/**
 * @desc this is a global error handling middleware 
 */
const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode === 200 ? 500: res.statusCode;

    res.status(statusCode)

    res.json({
        code: statusCode,
        remark: err.message,
        stackTrace: process.env.ENVIRONMENT === 'development'? err.stack: null
    })
}

/**
 * @desc This is 404 not found error middleware 
 */
const notFound = (req, res, next) =>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

export { errorHandler, notFound }