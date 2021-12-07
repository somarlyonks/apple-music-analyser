import {Analyser} from './computation'


addEventListener('message', ({data}) => {
    new Analyser(data).read().then(postMessage)
})
