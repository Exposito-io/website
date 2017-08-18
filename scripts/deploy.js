const { execFile } = require('child-process-promise')



// npm version patch
// docker build -t gcr.io/quantal-152414/exposito-website:v0.0.3 -f deploy/Dockerfile .
// gcloud docker -- push gcr.io/quantal-152414/exposito-website:v0.0.3
// kubectl set image deployment exposito-website exposito-website=


async function main() {
    let versionResults = await execFile('npm', ['version', 'patch'])

    let config = require('../package.json')
    let versionTag = `gcr.io/quantal-152414/exposito-website:v${config.version}`

    await execFile('docker', ['build', '-t', versionTag, '-f', 'deploy/Dockerfile', '.'])
    await execFile('gcloud', ['docker', '--', 'push', versionTag])
    await execFile('kubectl', ['set', 'image', 'deployment', 'exposito-website', 'exposito-website=' + versionTag])
}


main()
.then(() => console.log('done'))
.catch(err => console.log('error', err))