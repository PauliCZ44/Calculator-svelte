var ghpages = require('gh-pages')

ghpages.publish(
  'public', // path to public directory
  {
    branch: 'gh-pages',
    repo: 'https://github.com/PauliCZ44/Calculator-svelte.git', // Update to point to your repository
    user: {
      name: 'PauliCZ44', // update to use your name
      email: 'stastnyp@seznam.cz' // Update to use your email
    }
  },
  () => {
    console.log('Deploy Complete!')
  }
)
