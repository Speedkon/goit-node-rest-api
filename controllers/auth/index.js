const registration = require('./registration')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateAvatar = require('./avatars')

const controllerWrapper = require('../../helpers/controllerWrapper');

module.exports = {
    registration: controllerWrapper(registration),
    login: controllerWrapper(login),
    logout: controllerWrapper(logout),
    current: controllerWrapper(current),
    updateAvatar: controllerWrapper(updateAvatar)
}