/**
 * [Rocketseat Bootcamp] | GoNode: 1st challenge
 * Author: Ricardo T. Ono
 */

const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
  )
  return next()
}

// app.use(logMiddleware);

const checkAgeParamsMiddleware = (req, res, next) => {

  let { idade } = req.query;

  if (isNaN(idade) || idade == '') {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  res.render('form.njk')
})

app.post('/check', (req, res) => {
  console.log(req.body)

  if (req.body.idade > 18) res.redirect(`/major?idade=${req.body.idade}`)

  res.redirect(`/minor?idade=${req.body.idade}`)
})

app.get('/major', checkAgeParamsMiddleware, (req, res) => {
  let idade = req.query.idade

  res.render('result.njk', {
    check: 'maior',
    idade
  })
})

app.get('/minor', checkAgeParamsMiddleware, (req, res) => {
  let idade = req.query.idade
  res.render('result.njk', {
    check: 'menor',
    idade
  })
})

app.listen(8080, (req, res) => {
  console.log('Server is on')
})
