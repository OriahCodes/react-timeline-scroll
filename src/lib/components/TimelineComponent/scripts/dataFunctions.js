import _ from 'lodash'

export const buildData = (contentRef, wrapperHeight) => {
    const scrollHeight = contentRef.offsetHeight

    let allMarkedNodes = contentRef.querySelectorAll("div[name='timeline-scroll']")

    let dataList = _.reduce(allMarkedNodes, (acc, node) => {

        const offsetTop = node.offsetTop
        const offsetHeight = node.offsetHeight

        acc.push({
            ...node.dataset,
            offsetTop,
            offsetHeight
        })
        return acc
    }, [])

    dataList = _.map(dataList, data => {
        const { offsetTop, offsetHeight } = data
        const top = (offsetTop / scrollHeight)
        const height = (offsetHeight / scrollHeight)
        return { ...data, top, height }
    })

    return dataList
}