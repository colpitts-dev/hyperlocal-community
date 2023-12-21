/* eslint-disable @typescript-eslint/no-unused-vars -- ignore */
module.exports = {
  POST: register,
}

function register(req: Request): string {
  const newMember = JSON.stringify({
    nickname: 'skip',
  })

  return newMember
}
