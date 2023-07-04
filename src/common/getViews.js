const K = 1000;
const TENK = 10000;
const M = 1000000;
const TENM = 10000000;
const B = 1000000000;
const TENB = 10000000000;
const T = 1000000000000

export default function getViews(viewCount) {
    let print;
    if(viewCount < K) {
        print = `${viewCount} views`
    } else if(viewCount < TENK) {
        print = `${(viewCount/K).toFixed(1)}K views`
    } else if(viewCount < M) {
        print = `${Math.floor(viewCount/K)}K views`
    } else if(viewCount < TENM) {
        print = `${(viewCount/M).toFixed(1)}M views`
    } else if(viewCount < B) {
        print = `${Math.floor(viewCount/M)}M views`
    } else if(viewCount < TENB) {
        print = `${(viewCount/B).toFixed(1)}B views`
    } else if(viewCount < T) {
        print = `${Math.floor(viewCount/B)}B views`
    }

    return print;
}
