import _ from 'lodash'

export const buildData = (contentRef, wrapperHeight) => {
    const scrollHeight = contentRef.offsetHeight

    let allMarkedNodes = contentRef.querySelectorAll("div[name='timeline-scroll']")
    // let allMarkedNodes = contentRef.querySelectorAll("div[data-type*='timeline-scroll-']")

    // let parentHeight = 0
    let dataList = _.reduce(allMarkedNodes, (acc, node) => {
        // let { label, text, type } = node.dataset
        const offsetTop = node.offsetTop
        const offsetHeight = node.offsetHeight
        // if (offsetTop + offsetHeight > parentHeight) parentHeight = offsetTop + offsetHeight

        acc.push({
            ...node.dataset,
            offsetTop,
            offsetHeight
        })
        return acc
    }, [])

    dataList = _.map(dataList, data => {
        const { offsetTop, offsetHeight } = data
        const top = (offsetTop / scrollHeight) * wrapperHeight
        const height = (offsetHeight / scrollHeight) * wrapperHeight
        return { ...data, top, height }
    })

    return dataList
}