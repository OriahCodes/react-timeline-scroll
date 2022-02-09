import _ from 'lodash'
import { MARK_TYPES } from '../TimelineComponent'

export const buildData = (contentRef, wrapperHeight) => {
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

    let textSectionHeight = 0
    let bulletSectionHeight = 0

    dataList = _.map(dataList, data => {
        let parentSectionPercent = undefined
        const { offsetTop, offsetHeight } = data
        const top = (offsetTop / scrollHeight)
        const height = (offsetHeight / scrollHeight)

        if (data.type) {
            if (data.type === MARK_TYPES.BULLET) {
                parentSectionPercent = height + bulletSectionHeight
                textSectionHeight += height
            }
            if (data.type === MARK_TYPES.TEXT) {
                parentSectionPercent = height + textSectionHeight
                textSectionHeight = 0
            }
            bulletSectionHeight = 0
        } else {
            textSectionHeight += height
            bulletSectionHeight += height
        }
        return { ...data, top, height, parentSectionPercent }
    })

    return dataList
}