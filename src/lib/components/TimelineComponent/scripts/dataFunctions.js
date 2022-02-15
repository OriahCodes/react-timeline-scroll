import _ from 'lodash'
import { MARK_TYPES } from '../TimelineComponent'

export const buildData = (contentRef) => {
    const scrollHeight = contentRef.offsetHeight
    let allMarkedNodes = contentRef.querySelectorAll("div[data-name='timeline-scroll-component']")

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

    let labelHelper = null
    let mappedData = []
    _.each(dataList.reverse(), data => {
        let { offsetTop, offsetHeight, label, type } = data

        let top = (offsetTop / scrollHeight)
        let height = (offsetHeight / scrollHeight)

        if (!type && label === labelHelper) {
            const lastSection = mappedData.pop()
            height += lastSection.height
            let offsetH = offsetHeight + lastSection.offsetHeight
            mappedData.push({ ...lastSection, top, height, offsetTop, offsetHeight: offsetH })
        } else {
            labelHelper = label
            mappedData.push({ ...data, top, height })
        }
    })

    return mappedData.reverse()
}