const { execFile } = require('child-process-promise')


// npm version patch
// docker build -t gcr.io/quantal-152414/exposito-website:v0.0.3 -f deploy/Dockerfile .
// gcloud docker -- push gcr.io/quantal-152414/exposito-website:v0.0.3


async function main() {
    let versionTag = 'gcr.io/quantal-152414/exposito-website:v0.0.3'
    let versionResults = await execFile('npm', ['version', 'patch'])
    await execFile('docker', ['build', '-t', versionTag, '-f', 'deploy/Dockerfile', '.'])
    await execFile('gcloud', ['docker', '--', 'push', versionTag])
}


main()
.then(() => console.log('done'))
.catch(err => console.log('error', err))