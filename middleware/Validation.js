module.exports = {
  Validate: function(body) {
    let errors = []
    if (!body.displayName || !body.email || !body.password || !body.password2) {
      errors.push({ msg: 'All fields are required' })
    }
    if (body.password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' })
    }
    if (body.password !== body.password2) {
      errors.push({ msg: 'Passwords do not match' })
    }
    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(errors)
      } else {
        resolve(true)
      }
    })
  }
}