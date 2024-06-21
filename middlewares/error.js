const errorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      message: 'Não foi possível processar sua solicitação'
    })
  }
  next()
}

module.exports = errorHandler