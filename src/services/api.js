import axios from 'axios'

export default {

  login (email, password) {
    return axios.post('/api/v1/login', {
      email, password
    }).then(({ data: { user } }) => {
      return { user }
    })
  },

  logout () {
    return axios.post('/api/v1/logout')
  },

  getConversationList () {
    return axios.get('/api/v1/conversations').then(({ data: { conversations } }) => {
      return conversations
    })
  },

  getConversation (id) {
    return axios.get(`/api/v1/conversations/${id}`).then(({ data: { conversation } }) => {
      return conversation
    })
  }

}
