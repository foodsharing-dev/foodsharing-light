module.exports = {
  foodsharing: process.env.FOODSHARING_BACKEND || 'http://localhost:18080',
  chat: process.env.CHAT_BACKEND || 'http://localhost:11337',
  api: process.env.API_BACKEND || 'http://localhost:8000'
}
