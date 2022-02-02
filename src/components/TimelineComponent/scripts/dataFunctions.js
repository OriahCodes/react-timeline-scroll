import _ from 'lodash'

export const buildData = (contentRef) => {
    const scrollHeight = contentRef.offsetHeight
    // let textMarkNodes = contentRef.querySelectorAll("div[data-type='text-mark']")
    // let bulletNodes = contentRef.querySelectorAll("div[data-type='bullet-mark']")
    // let contentNodes = contentRef.querySelectorAll("div[data-type='content']")
    let allMarkedNodes = contentRef.querySelectorAll("div[data-type*='timeline-scroll-']")

    let parentHeight = 0
    let dataList = _.reduce(allMarkedNodes, (acc, node) => {
        // let { label, text, type } = node.dataset
        const offsetTop = node.offsetTop
        const offsetHeight = node.offsetHeight
        if (offsetTop + offsetHeight > parentHeight) parentHeight = offsetTop + offsetHeight

        acc.push({
            ...node.dataset,
            offsetTop,
            offsetHeight
        })
        return acc
    }, [])

    dataList = _.map(dataList, data => {
        const { offsetTop, offsetHeight } = data
        const top = (offsetTop / parentHeight) * scrollHeight
        const height = (offsetHeight / parentHeight) * scrollHeight
        return { ...data, top, height }
    })

    return dataList
}